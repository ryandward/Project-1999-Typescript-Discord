import _ from 'lodash';
import { declare, declareTemplate, insertUser, suggestCharacterClasses, toonExists, } from './census_functions.js';
export const data = declareTemplate('bot');
export async function autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption)
        return;
    if (focusedOption.name === 'class') {
        try {
            const choices = await suggestCharacterClasses(focusedOption.value);
            await interaction.respond(choices.map(choice => ({ name: choice.ClassName, value: choice.CharacterClass })));
        }
        catch (error) {
            console.error('Error in autocomplete:', error);
        }
    }
}
export async function execute(interaction) {
    const { options } = interaction;
    const discordId = interaction.user.id;
    const name = _.capitalize(options.get('name')?.value);
    const level = options.get('level')?.value;
    const characterClass = options.get('class')?.value;
    toonExists(name)
        .then(async () => {
        const newUser = await insertUser(discordId);
        let result = await declare(discordId, 'Bot', name, level, characterClass);
        if (newUser) {
            result += `\n:moneybag: <@${discordId}> has been added to the DKP database with 5 DKP!`;
        }
        await interaction.reply(result);
    })
        .catch(async (error) => {
        await interaction.reply(error.message);
        return;
    });
}
