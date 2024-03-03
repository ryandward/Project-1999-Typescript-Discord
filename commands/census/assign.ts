import { SlashCommandBuilder } from '@discordjs/builders';
import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { AppDataSource } from '../../app_data.js';
import { Status } from '../../entities/Status.js';
import {
  classMustExist,
  levelMustBeValid,
  toonMustNotExist,
  validCharacterClasses,
  declare,
  insertUser,
} from './census_functions.js';
import _ from 'lodash';
import { FindManyOptions, ILike, Not } from 'typeorm';
import { Census } from '../../entities/Census.js';

const classNames = await validCharacterClasses();

export async function getActiveStatuses() {
  return (await AppDataSource.manager.find(Status)).filter(status => status.Status !== 'Dropped');
}
const activeStatuses = await getActiveStatuses();

export async function statusMustBeActive(Status: string) {
  const statusEntered = activeStatuses.find(status => status.Status === Status);
  if (!statusEntered) throw new Error(`:x: ${Status} is not a valid active status.`);
  return statusEntered;
}

export const data = new SlashCommandBuilder()
  .setName('assign')
  .setDescription('Assign a toon to a discord user')

  .addUserOption(option =>
    option.setName('user').setDescription('The user to assign the toon to').setRequired(true),
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
      .setDescription('The name of the toon to assign. Autocomplete should not match any toons.')
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
    let response: string;
    const { options } = interaction;

    let status = options.get('status')?.value as string;
    const discordId = options.get('user')?.value as string;
    const name = _.capitalize(options.get('name')?.value as string);
    const characterClass = options.get('class')?.value as string;
    const level = options.get('level')?.value as number;

    if (!discordId) {
      throw new Error('You must provide a discord user to assign the toon to.');
    }

    await Promise.all([
      toonMustNotExist(name),
      classMustExist(characterClass),
      levelMustBeValid(level),
      statusMustBeActive(status),
    ]);

    const newUserResult = await insertUser(discordId);
    if (newUserResult) {
      status = 'Main';
    }
    const newToonResult = await declare(discordId, status, name, level, characterClass);
    if (newUserResult) {
      response =
        newUserResult +
        '\n' +
        newToonResult +
        '\n' +
        `:warning: <@${discordId}>'s \`${name}\` was declared as \`Main\` since none was found.`;
    }
    else {
      response = newToonResult;
    }
    return interaction.reply(response);
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
