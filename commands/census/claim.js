import { SlashCommandBuilder } from 'discord.js';
import _ from 'lodash';
import { ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { ActiveToons } from '../../entities/ActiveToons.js';
export const data = new SlashCommandBuilder()
    .setName('claim')
    .setDescription('Claim ownership of a bot character')
    .addStringOption(option => option
    .setName('name')
    .setDescription('The name of the bot character')
    .setRequired(true)
    .setAutocomplete(true)
    .setMaxLength(24));
export async function autocomplete(interaction) {
    try {
        const focusedOption = interaction.options.getFocused(true);
        if (!focusedOption)
            return;
        if (focusedOption.name === 'name') {
            const choices = {
                where: {
                    Name: ILike(`%${focusedOption.value}%`),
                    Status: 'Bot',
                },
                take: 25,
            };
            const toons = await AppDataSource.manager.find(ActiveToons, choices);
            await interaction.respond(toons.map(toon => ({ name: toon.Name, value: toon.Name })));
        }
    }
    catch (error) {
        console.error('Error in autocomplete:', error);
    }
}
export const execute = async (interaction) => {
    try {
        const { options } = interaction;
        const name = _.capitalize(options.get('name')?.value);
        const discordId = interaction.user.id;
        const toon = await AppDataSource.manager.findOne(ActiveToons, {
            where: { Name: name, Status: 'Bot' },
        });
        if (!toon) {
            throw new Error(`:x: \`${name}\` is not a toon declared as a \`Bot\` available for claiming.`);
        }
        else {
            const oldOwner = toon.DiscordId;
            await AppDataSource.manager.update(ActiveToons, { Name: name, Status: 'Bot' }, { DiscordId: discordId });
            return interaction.reply(`:white_check_mark: <@${discordId}> has successfully claimed \`${name}\` from <@${oldOwner}> .`);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return interaction.reply(error.message);
        }
    }
};
