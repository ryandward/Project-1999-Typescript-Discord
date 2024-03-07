import { EmbedBuilder, SlashCommandBuilder, } from 'discord.js';
import _ from 'lodash';
import { AppDataSource } from '../../app_data.js';
import { Bank } from '../../entities/Bank.js';
export const data = new SlashCommandBuilder()
    .setName('find')
    .setDescription('Find an item in the guild bank.')
    .addStringOption(option => option
    .setName('item')
    .setDescription('Item name to search for')
    .setRequired(true)
    .setAutocomplete(true));
export function formatField(field) {
    return '```\n' + field.join('\n') + '\n```';
}
export async function autocomplete(interaction) {
    try {
        const focusedOption = interaction.options.getFocused(true);
        if (!focusedOption)
            return;
        if (focusedOption.name === 'item') {
            const searchTerm = `%${focusedOption.value}%`;
            const items = await AppDataSource.manager
                .createQueryBuilder(Bank, 'item')
                .select('item.name', 'Name')
                .addSelect('COUNT(Name)', 'Count')
                .where('Name ILIKE :searchTerm', { searchTerm })
                .groupBy('Name')
                .limit(10)
                .getRawMany();
            await interaction.respond(items.map(item => ({
                name: `(${item.Count}x) ${item.Name}`,
                value: item.Name,
            })));
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
        if (!options.get('item')) {
            // get the user's toons
            throw new Error('You must provide an item to find.');
        }
        else {
            const itemName = options.get('item')?.value;
            const itemData = await AppDataSource.manager.find(Bank, {
                where: { Name: itemName },
            });
            const bankers = itemData.map(banker => banker.Banker);
            const uniqueBankers = [...new Set(bankers)];
            const embed = new EmbedBuilder()
                .setTitle(':bank: Bank Record')
                .setDescription(`**${itemName}**\n<t:${Math.floor(Date.now() / 1000)}:R>`)
                .setColor('Green');
            const embedBuilder = uniqueBankers.reduce((currentEmbed, banker) => {
                const itemsOnBankers = itemData.filter(item => item.Banker === banker);
                const sortedItems = itemsOnBankers.sort((a, b) => a.Location.localeCompare(b.Location));
                const sortedItemLocations = formatField(sortedItems.map(item => _.replace(item.Location, '-', ' ')));
                const sortedItemQuantities = formatField(sortedItems.map(item => item.Quantity.toString()));
                if (sortedItems.length === 0) {
                    return currentEmbed;
                }
                return currentEmbed.addFields({
                    name: banker,
                    value: `${sortedItems.length} matching item(s).`,
                    inline: false,
                }, { name: ':mag: Location', value: sortedItemLocations, inline: true }, { name: ':moneybag: Quantity', value: sortedItemQuantities, inline: true });
            }, embed);
            await interaction.reply({ embeds: [embedBuilder] });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            await interaction.reply(`Error in execute: ${error.message}`);
        }
    }
}
