import axios from 'axios';
import {
  AutocompleteInteraction,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import _ from 'lodash';
import puppeteer from 'puppeteer';
import { AppDataSource } from '../../app_data.js';
import { Bank } from '../../entities/Bank.js';

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

export function formatField(field: string[]): string {
  return '```\n' + field.join('\n') + '\n```';
}

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

export async function execute(interaction: CommandInteraction) {
  try {
    const { options } = interaction;

    if (!options.get('item')) {
      throw new Error('You must provide an item to find.');
    }
    else {
      const itemName = options.get('item')?.value as string;

      const itemData = await AppDataSource.manager.find(Bank, {
        where: { Name: itemName },
      });

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

      const screenshotPath = await captureScreenshot(itemName);
      if (screenshotPath === null) {
        await interaction.reply({ embeds: [embedBuilder] });
      }
      else {
        await interaction.reply({ embeds: [embedBuilder], files: [screenshotPath] });
      }
    }
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply(`Error in execute: ${error.message}`);
    }
  }
}

interface MediaWikiResponse {
  query: {
    pages: {
      [key: string]: {
        fullurl?: string;
        revisions?: [{ '*': string }];
        imageinfo?: [{ url: string }];
      };
    };
  };
}

async function getItemUrl(itemName: string): Promise<string | null> {
  // Standardize the item name to ensure cache consistency
  const standardizedItemName = itemName.replace('Song: ', '').replace('Spell: ', '');

  const baseUrl = 'http://localhost/mediawiki/api.php';
  const searchParams = new URLSearchParams({
    action: 'query',
    prop: 'info',
    inprop: 'url',
    titles: standardizedItemName,
    format: 'json',
  });

  const searchResponse = await axios.get<MediaWikiResponse>(baseUrl, { params: searchParams });

  // Return the 'fullurl' property of the page
  return (
    searchResponse.data.query.pages[Object.keys(searchResponse.data.query.pages)[0]].fullurl || null
  );
}
async function captureScreenshot(itemName: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const itemUrl = await getItemUrl(itemName);
  if (itemUrl === null) {
    return null;
  }
  await page.goto(itemUrl);

  const element = await page.$('#mw-content-text > div.mw-parser-output > div.itembg > div');
  if (element !== null) {
    await element.screenshot({ path: 'element.png' });
  }
  else {
    console.log('No element found with the given selector.');
  }

  await browser.close();

  return 'element.png';
}
