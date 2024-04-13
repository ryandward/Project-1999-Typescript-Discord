import { SlashCommandBuilder } from '@discordjs/builders';
import { AutocompleteInteraction, CommandInteraction, EmbedBuilder } from 'discord.js';
import _ from 'lodash';
import { FindManyOptions, ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { Census } from '../../entities/Census.js';
import { Status } from '../../entities/Status.js';
import {
  classMustExist,
  formatField,
  levelMustBeValid,
  toonMustExist,
  userMustExist,
  validCharacterClasses,
} from './census_functions.js';

const classNames = await validCharacterClasses();

export async function getActiveStatuses() {
  return (await AppDataSource.manager.find(Status)).filter(status => status.Status !== 'Dropped');
}
const activeStatuses = await getActiveStatuses();

export async function statusMustBeActive(inputStatus: string) {
  const statusEntered = activeStatuses.find(status => status.Status === inputStatus);
  if (!statusEntered) throw new Error(`:x: ${inputStatus} is not a valid active status.`);
  return statusEntered;
}

export const data = new SlashCommandBuilder()
  .setName('reassign')
  .setDescription('reassign or manage a toon to a discord user')

  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('The user to reassign or manage the toon to')
      .setRequired(true),
  )
  .addStringOption(option =>
    option
      .setName('status')
      .setDescription('The new status of the character')
      .setRequired(true)
      .addChoices(...activeStatuses.map(status => ({ name: status.Status, value: status.Status }))),
  )
  .addStringOption(option =>
    option
      .setName('name')
      .setDescription('The name of the toon to reassign or manage.')
      .setRequired(true)
      .setAutocomplete(true)
      .setMaxLength(24),
  )
  .addNumberOption(option =>
    option
      .setName('level')
      .setDescription('The level of the toon')
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(60),
  )
  .addStringOption(option =>
    option
      .setName('class')
      .setDescription('The class of the character')
      .setRequired(true)
      .addChoices(...classNames),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  try {
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption) return;

    if (focusedOption.name === 'name') {
      const choices: FindManyOptions = {
        where: {
          Name: ILike(`%${focusedOption.value}%`),
        },
        take: 10,
      };
      const toons = await AppDataSource.manager.find(Census, choices);
      await interaction.respond(toons.map(toon => ({ name: toon.Name, value: toon.Name })));
    }
  }
  catch (error) {
    console.error('Error in autocomplete:', error);
  }
}

export const execute = async (interaction: CommandInteraction) => {
  try {
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member || !member.permissions.has(['ManageGuild'])) {
      throw new Error('You do not have permission to use this command.');
    }
    const { options } = interaction;

    const status = options.get('status')?.value as string;
    const discordId = options.get('user')?.value as string;
    const name = _.capitalize(options.get('name')?.value as string);
    const characterClass = options.get('class')?.value as string;
    const level = options.get('level')?.value as number;

    if (!discordId) {
      throw new Error('You must provide a discord user to reassign or manage the toon to.');
    }

    await Promise.all([
      toonMustExist(name),
      userMustExist(discordId),
      classMustExist(characterClass),
      levelMustBeValid(level),
      statusMustBeActive(status),
    ]);

    // load the previous toon data
    const toon = await AppDataSource.manager.findOne(Census, { where: { Name: name } });
    if (!toon) {
      throw new Error(`:x: ${name} does not exist.`);
    }

    // format the previous toon data:
    const previousStatus = toon.Status;
    const previousDiscordId = toon.DiscordId;
    const previousCharacterClass = toon.CharacterClass;
    const previousLevel = toon.Level;

    // update the toon with the new status
    const updateToonResult = await AppDataSource.manager.update(
      Census,
      { Name: name },
      { Status: status, DiscordId: discordId, CharacterClass: characterClass, Level: level },
    );

    if (updateToonResult) {
      const previous = [previousStatus, previousCharacterClass, previousLevel.toString()];
      const updated = [status, characterClass, level.toString()];

      const embed = new EmbedBuilder()
        .setTitle(`:fast_forward: Character Update for ${name}`)
        .setColor('Green')
        .addFields(
          {
            name: 'Previous',
            value: `<@${previousDiscordId}>` + '\n' + formatField(previous),
            inline: true,
          },
          {
            name: 'Updated',
            value: `<@${discordId}>` + '\n' + formatField(updated),
            inline: true,
          },
        );

      await interaction.reply({ embeds: [embed] });
    }
  }
  catch (error) {
    if (error instanceof Error) {
      return interaction.reply({
        content: error.message,
        ephemeral: true,
      });
    }
  }
};
