/**
 * `/assign` command — officer tool to create and assign a character to any Discord user.
 *
 * Requires `ManageGuild` permission. Creates a new `Census` record for
 * the specified user. If the user is new, automatically inserts them into
 * `Dkp` and forces the first character to `"Main"` status.
 *
 * @module
 */
import { SlashCommandBuilder } from '@discordjs/builders';
import { AutocompleteInteraction, ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import _ from 'lodash';
import { FindManyOptions, ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { Census } from '../../entities/Census.js';
import { Status } from '../../entities/Status.js';
import {
  classMustExist,
  declare,
  insertUser,
  levelMustBeValid,
  toonMustNotExist,
  validCharacterClasses,
} from './census_functions.js';

const classNames = await validCharacterClasses();

export const permissions = 'ManageGuild';

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

export const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member || !member.permissions.has([permissions])) {
      throw new Error('You do not have permission to use this command.');
    }
    let response: string;
    const { options } = interaction;

    let status = options.get('status')?.value as string;
    console.log('execute: Status:', status);
    const discordId = options.get('user')?.value as string;
    console.log('execute: DiscordId:', discordId);
    const name = _.capitalize(options.get('name')?.value as string);
    console.log('execute: Name:', name);
    const characterClass = options.get('class')?.value as string;
    console.log('execute: CharacterClass:', characterClass);
    const level = options.get('level')?.value as number;
    console.log('execute: Level:', level);

    if (!discordId) {
      throw new Error('You must provide a discord user to assign the toon to.');
    }
    console.log('execute: Before Validation');
    await Promise.all([
      toonMustNotExist(name),
      classMustExist(characterClass),
      levelMustBeValid(level),
      statusMustBeActive(status),
    ]);
    console.log('execute: After Validation');
    let newUserResult = await insertUser(discordId);
    console.log('execute: newUserResult:', newUserResult);
    if (newUserResult && status !== 'Main') {
      status = 'Main';
      newUserResult =
        newUserResult +
        '\n' +
        `:warning: <@${discordId}>'s \`${name}\` was declared as \`Main\` since no \`Main\` was found.`;
    }
    console.log('execute: Status After New User:', status);

    const newToonResult = await declare(discordId, status, name, level, characterClass);
    console.log('execute: NewToonResult:', newToonResult);
    if (newUserResult) {
      response = newUserResult + '\n' + newToonResult;
    }
    else {
      response = newToonResult;
    }
    return interaction.reply(response);
  }
  catch (error) {
    if (error instanceof Error) {
      const timestamp = new Date().toISOString();
      return interaction.reply({
        content: `[${timestamp}] ${error.message}`,
        flags: MessageFlags.Ephemeral,
      });
    }
  }
};
