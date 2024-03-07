import { EmbedBuilder, SlashCommandBuilder, } from 'discord.js';
import { ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { ActiveToons } from '../../entities/ActiveToons.js';
import { formatField, returnAllActiveToonsByDiscordId, returnAllActiveToonsByName, } from './census_functions.js';
export const data = new SlashCommandBuilder()
    .setName('toons')
    .setDescription('Discovers toons related to a name or a user.')
    .addUserOption(option => option.setName('user').setDescription('User to search for').setRequired(false))
    .addStringOption(option => option.setName('name').setDescription('Name of the toon').setAutocomplete(true));
export async function autocomplete(interaction) {
    try {
        const focusedOption = interaction.options.getFocused(true);
        if (focusedOption.name === 'name') {
            const options = {
                where: { Name: ILike(`%${focusedOption.value}%`) },
                take: 10,
            };
            const choices = await AppDataSource.manager.find(ActiveToons, options);
            await interaction.respond(choices.map(choice => ({ name: choice.Name, value: choice.Name })));
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error in autocomplete:', error);
        }
    }
}
export async function execute(interaction) {
    try {
        const { options } = interaction;
        let discordId = interaction.user.id;
        let toonsData;
        if (!options.get('user') && !options.get('name')) {
            // get the user's toons
            discordId = interaction.user.id;
            toonsData = await returnAllActiveToonsByDiscordId(discordId);
        }
        else if (options.get('user')) {
            discordId = options.get('user')?.value;
            toonsData = await returnAllActiveToonsByDiscordId(discordId);
        }
        else if (options.get('name')) {
            toonsData = await returnAllActiveToonsByName(options.get('name')?.value);
            discordId = toonsData[0].DiscordId;
        }
        const statusOrder = ['Main', 'Alt', 'Bot', 'Dropped'];
        const embed = new EmbedBuilder()
            .setTitle(':busts_in_silhouette: Census Record')
            .setDescription(`<@${discordId}>\n<t:${Math.floor(Date.now() / 1000)}:R>`)
            .setColor('Green');
        const embedBuilder = statusOrder.reduce((currentEmbed, status) => {
            const toonsWithStatus = toonsData.filter(toon => toon.Status === status);
            // Skip this status if there are no toons with this status
            if (toonsWithStatus.length === 0) {
                return currentEmbed;
            }
            const sortedToons = toonsWithStatus.sort((a, b) => b.Level - a.Level);
            const sortedToonNames = formatField(sortedToons.map(toon => toon.Name));
            const sortedToonClasses = formatField(sortedToons.map(toon => toon.CharacterClass));
            const sortedToonLevels = formatField(sortedToons.map(toon => toon.Level.toString()));
            return currentEmbed.addFields({
                name: status,
                value: `${toonsWithStatus.length} character(s) declared as ${status.toLowerCase()}(s)`,
                inline: false,
            }, { name: ':bust_in_silhouette: Name', value: sortedToonNames, inline: true }, { name: ':crossed_swords: Class', value: sortedToonClasses, inline: true }, { name: ':arrow_double_up: Level', value: sortedToonLevels, inline: true });
        }, embed);
        await interaction.reply({ embeds: [embedBuilder] });
    }
    catch (error) {
        if (error instanceof Error) {
            return interaction.reply({ content: error.message, ephemeral: true });
        }
    }
}
