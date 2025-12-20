import { SlashCommandBuilder } from '@discordjs/builders';
import {
  ActionRowBuilder,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
  StringSelectMenuBuilder,
} from 'discord.js';
import _ from 'lodash';
import { Between, FindManyOptions } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { Census } from '../../entities/Census.js';
import { SharedToons } from '../../entities/SharedModels.js';
import { Status } from '../../entities/Status.js';
import { formatField, validCharacterClasses } from '../census/census_functions.js';
import { loginLogic } from './utility_functions.js';

const classNames = await validCharacterClasses();

async function getActiveStatuses() {
  return (await AppDataSource.manager.find(Status)).filter(status => status.Status === 'Bot');
}
const activeStatuses = await getActiveStatuses();

export async function statusMustBeActive(inputStatus: string) {
  const statusEntered = activeStatuses.find(status => status.Status === inputStatus);
  if (!statusEntered) throw new Error(`:x: ${inputStatus} is not a valid active status.`);
  return statusEntered;
}

export const data = new SlashCommandBuilder()
  .setName('browse')
  .setDescription('Browse shared toons')
  .addStringOption(option =>
    option
      .setName('class')
      .setDescription('The class of the shared toon (Bot).')
      .setRequired(false)
      .addChoices(...classNames),
  )
  .addStringOption(option =>
    option
      .setName('levelrange')
      .setDescription('The level range to filter by')
      .setRequired(false)
      .addChoices(
        { name: '1-20', value: '1-20' },
        { name: '21-39', value: '21-39' },
        { name: '40-59', value: '40-59' },
        { name: '60', value: '60' },
      ),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  try {
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption) return;
    // Add autocomplete logic if needed
  }
  catch (error) {
    console.error('Error in autocomplete:', error);
  }
}

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  try {
    const { options } = interaction;
    const classFilter = options.get('class')?.value as string | undefined;
    const levelRangeFilter = options.get('levelrange')?.value as string | undefined;

    const whereClause: FindManyOptions<Census> = {
      where: { Status: 'Bot' },
    };

    if (classFilter) {
      whereClause.where = { ...whereClause.where, CharacterClass: classFilter };
    }

    if (levelRangeFilter) {
      const [min, max] = levelRangeFilter.split('-').map(Number);
      if (max) {
        whereClause.where = { ...whereClause.where, Level: Between(min, max) };
      }
      else {
        whereClause.where = { ...whereClause.where, Level: min };
      }
    }

    const censusToons = await AppDataSource.manager.find(Census, whereClause);
    const sharedToons = await AppDataSource.manager.find(SharedToons);
    const sharedToonNames = sharedToons.map(toon => toon.Name);
    const filteredToons = censusToons.filter(toon => sharedToonNames.includes(toon.Name));

    // Create a map of toon names to their notes
    const notesMap = new Map<string, string | null>();
    sharedToons.forEach(toon => {
      notesMap.set(toon.Name, toon.Notes);
    });

    if (filteredToons.length === 0) {
      await interaction.reply({ content: 'No matching bots found.', ephemeral: true });
      return;
    }

    const levelRanges = {
      '1-20': { min: 1, max: 20, toons: [] as Census[] },
      '21-39': { min: 21, max: 39, toons: [] as Census[] },
      '40-59': { min: 40, max: 59, toons: [] as Census[] },
      '60': { min: 60, max: 60, toons: [] as Census[] },
    };

    filteredToons.forEach(toon => {
      const level = Number(toon.Level);
      if (level >= 1 && level <= 20) levelRanges['1-20'].toons.push(toon);
      else if (level >= 21 && level <= 39) levelRanges['21-39'].toons.push(toon);
      else if (level >= 40 && level <= 59) levelRanges['40-59'].toons.push(toon);
      else if (level === 60) levelRanges['60'].toons.push(toon);
    });

    const embed = new EmbedBuilder()
      .setTitle(':busts_in_silhouette: Shared Bot Census')
      .setDescription(`<t:${Math.floor(Date.now() / 1000)}:R>`)
      .setColor('Green');

    const embedBuilder = Object.entries(levelRanges).reduce(
      (currentEmbed, [levelRange, { toons }]) => {
        if (toons.length === 0) {
          return currentEmbed;
        }

        const sortedToons = toons.sort((a, b) => {
          const levelA = Number(a.Level);
          const levelB = Number(b.Level);
          if (levelB !== levelA) {
            return levelA - levelB;
          }
          return a.CharacterClass.localeCompare(b.CharacterClass);
        });

        // Format names with notes underneath if they exist
        const sortedToonNames = formatField(
          sortedToons.map(toon => {
            const name = _.capitalize(toon.Name);
            const note = notesMap.get(toon.Name);
            if (note) {
              return `${name}\n┗ *${note}*`;
            }
            return name;
          }),
        );
        const sortedToonClasses = formatField(
          sortedToons.map(toon => {
            const note = notesMap.get(toon.Name);
            // Add blank line to align with notes in name column
            if (note) {
              return `${toon.CharacterClass}\n\u200b`;
            }
            return toon.CharacterClass;
          }),
        );
        const sortedToonLevels = formatField(
          sortedToons.map(toon => {
            const note = notesMap.get(toon.Name);
            // Add blank line to align with notes in name column
            if (note) {
              return `${toon.Level.toString()}\n\u200b`;
            }
            return toon.Level.toString();
          }),
        );

        return currentEmbed.addFields(
          {
            name: `Level Range: ${levelRange}`,
            value: `${toons.length} character(s) in this range`,
            inline: false,
          },
          { name: ':bust_in_silhouette: Name', value: sortedToonNames, inline: true },
          { name: ':crossed_swords: Class', value: sortedToonClasses, inline: true },
          { name: ':arrow_double_up: Level', value: sortedToonLevels, inline: true },
        );
      },
      embed,
    );

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('toon_select')
      .setPlaceholder('Select a character to log in to.')
      .addOptions(
        filteredToons
          .sort((a, b) => a.Name.localeCompare(b.Name))
          .map(toon => ({
            label: `${_.capitalize(toon.Name)} (${toon.CharacterClass}, ${toon.Level})`,
            value: toon.Name,
          })),
      );

    const selectRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>();
    buttonRow.addComponents(
      new ButtonBuilder()
        .setCustomId('login')
        .setLabel(
          `Get login using ${(interaction.member as GuildMember)?.displayName ?? 'Unknown'}'s privileges`,
        )
        .setStyle(ButtonStyle.Primary),
    );

    const replyMessage = await interaction.reply({
      embeds: [embedBuilder],
      components: [selectRow, buttonRow],
      ephemeral: false,
      fetchReply: true,
    });

    let selectedToon: string | null = null;
    // Create a collector to handle the button and menu interaction
    const collector = replyMessage.createMessageComponentCollector({ time: 120000 });

    collector.on('collect', async i => {
      // Check if the interacting user is the same as the original user
      if (i.user.id !== interaction.user.id) {
        await i.reply({ content: 'You are not authorized to use this button.', ephemeral: true });
        return;
      }

      if (i.isStringSelectMenu()) {
        selectedToon = i.values[0];
        await i.deferUpdate();
      }
      if (i.isButton() && i.customId === 'login') {
        if (!selectedToon) {
          await i.reply({ content: 'Please select a character to log in to.', ephemeral: true });
          return;
        }
        try {
          await loginLogic(i, selectedToon);
        }
        catch (error) {
          if (error instanceof Error) {
            await i.reply({ content: error.message, ephemeral: true });
          }
          else {
            console.error('An unexpected error occured in loginLogic:', error);
            await i.reply({
              content: 'An unexpected error occured in loginLogic.',
              ephemeral: true,
            });
          }
          return;
        }

        // Edit the original reply to remove components
        await interaction.editReply({ components: [] });
        // Manually stop the collector after button press.
        collector.stop();
      }
    });
    collector.on('end', () => {
      // Optionally disable buttons or clean up after time expires
      console.log('Collector ended');
    });
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply({ content: error.message, ephemeral: true });
    }
    else {
      console.error('An unexpected error occurred:', error);
      await interaction.reply({ content: 'An unexpected error occurred.', ephemeral: true });
    }
  }
}
