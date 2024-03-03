import _ from 'lodash';
import { classMustExist, declare, declareData, levelMustBeValid, toonMustNotExist, userMustExist, } from './census_functions.js';
export const data = await declareData('bot');
export const execute = async (interaction) => {
    const { options } = interaction;
    const name = _.capitalize(options.get('name')?.value);
    const discordId = interaction.user.id;
    const characterClass = options.get('class')?.value;
    const level = options.get('level')?.value;
    try {
        await userMustExist(discordId);
        await levelMustBeValid(level);
        await toonMustNotExist(name);
        await classMustExist(characterClass);
        const newToonResult = await declare(discordId, 'Bot', name, level, characterClass);
        return interaction.reply(newToonResult);
    }
    catch (error) {
        if (error instanceof Error) {
            return interaction.reply(error.message);
        }
    }
    ;
};
