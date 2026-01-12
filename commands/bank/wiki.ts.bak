import * as Canvas from '@napi-rs/canvas';
import {
  AttachmentBuilder,
  CommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import _ from 'lodash';
import { getImageUrl, getSpellDescription, getStatsBlock } from './item_functions.js';

export const data = new SlashCommandBuilder()
  .setName('wiki')
  .setDescription('Find stats on an item from the wiki.')
  .addStringOption(option =>
    option
      .setName('item')
      .setDescription('Item name to search for')
      .setRequired(true)
      .setAutocomplete(false),
  );

export async function execute(interaction: CommandInteraction) {
  try {
    const { options } = interaction;

    if (!options.get('item')) {
      throw new Error('You must provide an item to find.');
    }
    else {
      const itemName = options.get('item')?.value as string;

      // check if the itemName is a spell or a song
      let itemText: string | null | undefined = '';

      if (itemName.startsWith('Spell: ') || itemName.startsWith('Song: ')) {
        // const spellLevels = await getSpellLevels(itemName);
        itemText = await getSpellDescription(itemName);
      }
      else {
        itemText = await getStatsBlock(itemName);
      }

      if (!itemText) {
        await interaction.reply({ content: 'Item not found.', flags: MessageFlags.Ephemeral });
        return;
      }

      itemText = itemText?.replace(/\[\[[^\]]*\|([^\]]+)\]\]/g, '$1');
      itemText = itemText?.replace(/[[\]*]/g, '');
      itemText = itemText?.replace(/(.{1,35})(\s|$)/g, '$1\n');

      const lineHeight = 25;
      const lines = itemText.split('\n');
      const textHeight = lines.length * lineHeight;
      const padding = 50;
      const canvasHeight = _.max([textHeight + padding / 2, 200]) as number;
      const canvas = Canvas.createCanvas(715, canvasHeight);
      const context = canvas.getContext('2d');

      const background = await Canvas.loadImage('./images/stars.png');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      const imageUrl = await getImageUrl(itemName);

      if (imageUrl) {
        try {
          const icon = await Canvas.loadImage(imageUrl);
          context.fillStyle = 'rgba(255, 255, 255, 0.1)';

          const iconPadding = padding / 2;

          // Calculate the icon size and position
          const iconSize = 85;

          // Calculate the background size and position
          const bgSize = iconSize + 2 * iconPadding;
          const bgX = canvas.width - bgSize - padding / 2;
          const bgY = padding / 2;

          // Calculate the icon position from the background position
          const iconX = bgX + iconPadding;
          const iconY = bgY + iconPadding;

          // Define the corner radius
          const cornerRadius = 10;

          // Start a new path
          context.beginPath();

          // Draw the rounded rectangle
          context.moveTo(bgX + cornerRadius, bgY);
          context.arcTo(bgX + bgSize, bgY, bgX + bgSize, bgY + bgSize, cornerRadius);
          context.arcTo(bgX + bgSize, bgY + bgSize, bgX, bgY + bgSize, cornerRadius);
          context.arcTo(bgX, bgY + bgSize, bgX, bgY, cornerRadius);
          context.arcTo(bgX, bgY, bgX + bgSize, bgY, cornerRadius);
          context.closePath();

          // Fill the path
          context.fill();

          // Draw the icon on top of the gray rectangle
          context.drawImage(icon, iconX, iconY, iconSize, iconSize);
          if (itemText) {
            context.font = `${lineHeight}px sans-serif`;
            context.fillStyle = '#ffffff';
            lines.forEach((line, i) => {
              context.fillText(line.trim(), 25, 25 + i * lineHeight + 25);
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

      const embed = new EmbedBuilder()
        .setTitle(':books: Wiki Item Entry')
        .setDescription(`**${itemName}**\n<t:${Math.floor(Date.now() / 1000)}:R>`)
        .setColor('Green')
        .setImage('attachment://item-stats-image.png');

      await interaction.reply({
        embeds: [embed],
        files: [attachment],
      });
    }
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply(`Error in execute: ${error.message}`);
    }
  }
}
