import * as Canvas from '@napi-rs/canvas';
import {
  AttachmentBuilder,
  AutocompleteInteraction,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { AppDataSource } from '../../app_data.js';
import { Bank } from '../../entities/Bank.js';
import {
  formatField,
  getImageUrl,
  getItemStatsText,
  getSpellDescription,
  getSpellLevels,
} from './item_functions.js';

export const data = new SlashCommandBuilder()
  .setName('find')
  .setDescription('Find an item in the guild bank.')
  .addStringOption(option =>
    option
      .setName('item')
      .setDescription('The name of the item to search for')
      .setRequired(true)
      .setAutocomplete(true),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  try {
    const focusedOption = interaction.options.getFocused(true);
    if (focusedOption && focusedOption.name === 'item') {
      const searchTerm = `%${focusedOption.value}%`;
      const items = await AppDataSource.manager
        .createQueryBuilder(Bank, 'item')
        .select('item.name', 'Name')
        .addSelect('SUM(item.quantity)', 'Count')
        .where('Name ILIKE :searchTerm', { searchTerm })
        .groupBy('Name')
        .limit(10)
        .getRawMany();

      await interaction.respond(
        items.map(item => ({
          name: `(${item.Count}x) ${item.Name}`,
          value: item.Name,
        })),
      );
    }
  }
  catch (error) {
    console.error('Error in autocomplete:', error);
  }
}

export async function execute(interaction: CommandInteraction) {
  try {
    const itemName = interaction.options.get('item', true).value as string;
    const itemData = await AppDataSource.manager.find(Bank, {
      where: { Name: itemName },
    });
    if (itemData.length === 0) {
      await interaction.reply('Item not found.');
      return;
    }

    let itemText =
      itemName.startsWith('Spell: ') || itemName.startsWith('Song: ')
        ? `${await getSpellLevels(itemName)}\n\n${await getSpellDescription(itemName)}`
        : await getItemStatsText(itemName);

    if (!itemText) {
      await interaction.reply('Item not found.');
      return;
    }

    itemText = itemText.replace(/\[\[[^\]]*\|([^\]]+)\]\]/g, '$1');
    itemText = itemText.replace(/(.{1,45})(\s|$)/g, '$1\n');

    const lineHeight = 25;
    const padding = 50;
    const lines = itemText.split('\n');
    const textHeight = lines.length * lineHeight;
    const canvasHeight = Math.max(textHeight + padding, 200);
    const canvas = Canvas.createCanvas(700, canvasHeight);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/stars.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    const imageUrl = await getImageUrl(itemName);
    if (imageUrl) {
      const icon = await Canvas.loadImage(imageUrl);
      context.drawImage(icon, canvas.width - 100, 25, 75, 75);
      context.font = `${lineHeight}px sans-serif`;
      context.fillStyle = '#ffffff';
      lines.forEach((line, i) => {
        context.fillText(line, 25, 25 + i * lineHeight);
      });
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
      const sortedItemLocations = formatField(
        sortedItems.map(item => item.Location.replace('-', ' ')),
      );

      if (sortedItems.length === 0) {
        return currentEmbed;
      }

      currentEmbed.addFields(
        {
          name: `:bust_in_silhouette: ${banker}`,
          value: `${sortedItems.length} matching item(s)`,
          inline: false,
        },
        { name: ':mag: Location', value: sortedItemLocations, inline: true },
      );
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
  catch (error: unknown) {
    console.error('Error in execute:', error);
    if (error instanceof Error) {
      await interaction.reply(`Error in execute: ${error.message}`);
    }
    else {
      await interaction.reply('An unknown error occurred.');
    }
  }
}
