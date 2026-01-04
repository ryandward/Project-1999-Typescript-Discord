import {
  ActionRowBuilder,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  TextChannel,
} from 'discord.js';
import _ from 'lodash';
import { AppDataSource } from '../../app_data.js';
import { Bank } from '../../entities/Bank.js';
import { Census } from '../../entities/Census.js';
import { formatField } from './item_functions.js';

export const data = new SlashCommandBuilder()
  .setName('find')
  .setDescription('Find an item in the guild bank.')
  .addStringOption(option =>
    option
      .setName('item')
      .setDescription('Item name to search for')
      .setRequired(true)
      .setAutocomplete(true),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  try {
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption) return;

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

      return await interaction.respond(
        items.map(item => ({
          name: `(${item.Count}x) ${item.Name}`,
          value: item.Name,
        })),
      );
    }
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('Error in autocomplete:', error);
    }
  }
}

export async function execute(interaction: ChatInputCommandInteraction) {
  try {
    const { options } = interaction;

    if (!options.get('item')) {
      throw new Error('You must provide an item to find.');
    }

    const itemName = options.get('item')?.value as string;
    const itemData = await AppDataSource.manager.find(Bank, {
      where: { Name: itemName },
    });

    if (itemData.length === 0) {
      await interaction.reply({
        content: 'Item not found in bank.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const request = new ButtonBuilder()
      .setCustomId('request')
      .setLabel('Request')
      .setStyle(ButtonStyle.Success);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(request, cancel);

    const isStack = itemData.some(item => item.Quantity > 1);
    const bankers = itemData.map(item => item.Banker);

    const embed = new EmbedBuilder()
      .setTitle(':bank: Bank Record')
      .setDescription(`**${itemName}**\n<t:${Math.floor(Date.now() / 1000)}:R>`)
      .setColor('Green');

    const embedBuilder = [...new Set(bankers)].reduce((currentEmbed: EmbedBuilder, banker) => {
      const itemsOnBankers = itemData.filter(item => item.Banker === banker);
      const sortedItems = itemsOnBankers.sort((a, b) => a.Location.localeCompare(b.Location));
      const sortedItemLocations = formatField(
        sortedItems.map(item => _.replace(item.Location, '-', ' ')),
      );

      if (sortedItems.length === 0) {
        return currentEmbed;
      }

      currentEmbed.addFields(
        {
          name: `:bust_in_silhouette: ${banker}`,
          value: `${sortedItems.length} matching item(s).`,
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

    await interaction.reply({ embeds: [embedBuilder], components: [row] });

    let selectedToon: string | null = null;

    const filter = (i: { customId: string; user: { id: string } }) =>
      (i.customId === 'request' || i.customId === 'cancel' || i.customId === 'toon_select') &&
      i.user.id === interaction.user.id;

    try {
      const collected = await (interaction.channel as TextChannel)?.awaitMessageComponent({
        filter,
        time: 60000,
      });

      if (collected) {
        if (collected.customId === 'request') {
          // Fetch user's toons
          const userToons = await AppDataSource.manager.find(Census, {
            where: { DiscordId: interaction.user.id, Status: 'Main' },
          });

          const userAlts = await AppDataSource.manager.find(Census, {
            where: { DiscordId: interaction.user.id, Status: 'Alt' },
          });

          const allToons = [...userToons, ...userAlts];

          if (allToons.length === 0) {
            await collected.update({
              content:
                'You have no registered toons. Please use `/main` to register a character first.',
              components: [],
            });
            return;
          }

          // Create toon select menu
          const toonSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('toon_select')
            .setPlaceholder('Select which character needs this item')
            .addOptions(
              allToons
                .sort((a, b) => a.Name.localeCompare(b.Name))
                .map(toon => ({
                  label: `${_.capitalize(toon.Name)} (${toon.CharacterClass}, ${toon.Level})`,
                  value: toon.Name,
                })),
            );

          const toonSelectRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            toonSelectMenu,
          );

          await collected.update({
            content: 'Select which character you are requesting this item for:',
            components: [toonSelectRow],
          });

          // Wait for toon selection
          const toonCollected = await (interaction.channel as TextChannel)?.awaitMessageComponent({
            filter,
            time: 60000,
          });

          if (toonCollected && toonCollected.isStringSelectMenu()) {
            selectedToon = toonCollected.values[0];
            await toonCollected.update({ content: 'Submitting request...', components: [] });

            const requestChannel = interaction.client.channels.cache.get('1213309735886000159');
            if (requestChannel) {
              // Send the request with the toon name
              await (requestChannel as TextChannel).send({
                content:
                  '<@&875884412259143711>' +
                  '\n' +
                  `Request for **${itemName}** by <@${interaction.user.id}> for their character **${_.capitalize(selectedToon)}**`,
                embeds: [embedBuilder],
              });
            }
            await interaction.deleteReply();
          }
        }
        else if (collected.customId === 'cancel') {
          await interaction.deleteReply();
          await interaction.followUp({
            content: `Request for **${itemName}** cancelled.`,
            flags: MessageFlags.Ephemeral,
          });
        }
      }
    }
    catch (error) {
      if (error instanceof Error) {
        console.error('Error in awaitMessageComponent:', error);
      }
    }
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply(`Error in execute: ${error.message}`);
    }
  }
}
