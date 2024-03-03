import { SlashCommandBuilder } from 'discord.js';
import _ from 'lodash';
import { Brackets } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { ActiveToons } from '../../entities/ActiveToons.js';
export const data = new SlashCommandBuilder()
    .setName('claim')
    .setDescription('Claim ownership of a bot character')
    .addStringOption(option => option
    .setName('bot')
    .setDescription('The name or class of the bot character')
    .setRequired(true)
    .setAutocomplete(true)
    .setMaxLength(24));
export async function autocomplete(interaction) {
    try {
        const focusedOption = interaction.options.getFocused(true);
        if (!focusedOption)
            return;
        if (focusedOption.name === 'bot') {
            const searchTerm = focusedOption.value;
            const bots = await AppDataSource.manager
                .createQueryBuilder(ActiveToons, 'toon')
                .where('toon.Status = :status', { status: 'Bot' })
                .andWhere(new Brackets(qb => {
                qb.where('toon.Name ILIKE :search', { search: `%${searchTerm}%` }).orWhere('toon.CharacterClass ILIKE :search', { search: `%${searchTerm}%` });
            }))
                .orderBy('toon.Level', 'DESC')
                .take(25)
                .getMany();
            const responses = bots.map(bot => ({
                name: `${bot.Level} ${bot.CharacterClass}: ${bot.Name}`,
                value: bot.Name,
            }));
            await interaction.respond(responses);
        }
    }
    catch (error) {
        console.error('Error in autocomplete:', error);
    }
}
export const execute = async (interaction) => {
    try {
        const { options } = interaction;
        const name = _.capitalize(options.get('bot')?.value);
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
            return interaction.reply({ content: error.message, ephemeral: true });
        }
    }
};
