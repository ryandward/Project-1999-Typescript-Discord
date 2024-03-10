import * as Canvas from '@napi-rs/canvas';
import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, } from 'discord.js';
import _ from 'lodash';
import { AppDataSource } from '../../app_data.js';
import { Bank } from '../../entities/Bank.js';
import { getImageUrl, getItemStatsText, getSpellDescription, getSpellLevels, } from './item_functions.js';
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
                .addSelect('SUM(item.quantity)', 'Count')
                .where('Name ILIKE :searchTerm', { searchTerm })
                .groupBy('Name')
                .limit(10)
                .getRawMany();
            return await interaction.respond(items.map(item => ({
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
            throw new Error('You must provide an item to find.');
        }
        else {
            const itemName = options.get('item')?.value;
            const itemData = await AppDataSource.manager.find(Bank, {
                where: { Name: itemName },
            });
            // check if the itemName is a spell or a song
            let itemText = '';
            if (itemName.startsWith('Spell: ') || itemName.startsWith('Song: ')) {
                const spellLevels = await getSpellLevels(itemName);
                const spellDescription = await getSpellDescription(itemName);
                itemText = `${spellLevels}\n\n${spellDescription}`;
                // wrap newlines every 50 characters, but don't break words
            }
            else {
                itemText = await getItemStatsText(itemName);
            }
            if (!itemText) {
                await interaction.reply('Item not found.');
                return;
            }
            itemText = itemText?.replace(/\[\[[^\]]*\|([^\]]+)\]\]/g, '$1');
            itemText = itemText?.replace(/(.{1,45})(\s|$)/g, '$1\n');
            const lineHeight = 25;
            const lines = itemText.split('\n');
            const textHeight = lines.length * lineHeight;
            const padding = 50;
            const canvasHeight = _.max([textHeight + padding, 200]);
            const canvas = Canvas.createCanvas(700, canvasHeight);
            const context = canvas.getContext('2d');
            const background = await Canvas.loadImage('./images/stars.png');
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            const imageUrl = await getImageUrl(itemName);
            if (imageUrl) {
                try {
                    const icon = await Canvas.loadImage(imageUrl);
                    context.drawImage(icon, canvas.width - 100, 25, 75, 75);
                    if (itemText) {
                        context.font = `${lineHeight}px sans-serif`;
                        context.fillStyle = '#ffffff';
                        lines.forEach((line, i) => {
                            context.fillText(line, 25, 25 + i * lineHeight + 25);
                        });
                    }
                }
                catch (error) {
                    console.error('Failed to load image:', error);
                    return;
                }
            }
            const attachment = new AttachmentBuilder(await canvas.encode('png'), {
                name: 'item-stats-image.png',
            });
            const isStack = itemData.some(item => item.Quantity > 1);
            const bankers = itemData.map(item => item.Banker);
            const embed = new EmbedBuilder()
                .setTitle(':bank: Bank Record')
                .setDescription(`**${itemName}**\n<t:${Math.floor(Date.now() / 1000)}:R>`)
                .setColor('Green')
                .setImage('attachment://item-stats-image.png');
            const embedBuilder = [...new Set(bankers)].reduce((currentEmbed, banker) => {
                const itemsOnBankers = itemData.filter(item => item.Banker === banker);
                const sortedItems = itemsOnBankers.sort((a, b) => a.Location.localeCompare(b.Location));
                const sortedItemLocations = formatField(sortedItems.map(item => _.replace(item.Location, '-', ' ')));
                if (sortedItems.length === 0) {
                    return currentEmbed;
                }
                currentEmbed.addFields({
                    name: `:bust_in_silhouette: ${banker}`,
                    value: `${sortedItems.length} matching item(s).`,
                    inline: false,
                }, { name: ':mag: Location', value: sortedItemLocations, inline: true });
                if (isStack) {
                    currentEmbed.addFields({
                        name: ':money_bag: Stack',
                        value: formatField(sortedItems.map(item => item.Quantity.toString())),
                        inline: true,
                    });
                }
                return currentEmbed;
            }, embed);
            await interaction.reply({ embeds: [embedBuilder], files: [attachment] });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            await interaction.reply(`Error in execute: ${error.message}`);
        }
    }
}
