import { CommandInteraction } from 'discord.js';
import _ from 'lodash';
import {
  classMustExist,
  declare,
  declareData,
  insertUser,
  levelMustBeValid,
  toonMustNotExist,
} from './census_functions.js';

export const data = await declareData('alt');

export const execute = async (interaction: CommandInteraction) => {
  const { options } = interaction;
  const name = _.capitalize(options.get('name')?.value as string);
  const discordId = interaction.user.id;
  const characterClass = options.get('class')?.value as string;
  const level = options.get('level')?.value as number;

  try {
    let response: string;
    await toonMustNotExist(name);
    await levelMustBeValid(level);
    await classMustExist(characterClass);
    const newUserResult = await insertUser(discordId);
    const newToonResult = await declare(discordId, 'Alt', name, level, characterClass);
    if (newUserResult) {
      response = newToonResult + '\n' + newUserResult;
    }
    else {
      response = newToonResult;
    }
    return interaction.reply(response);
  }
  catch (error) {
    if (error instanceof Error) {
      return interaction.reply(error.message);
    }
  }
};
