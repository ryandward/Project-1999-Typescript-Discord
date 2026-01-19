import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import _ from 'lodash';
import { ActiveToons } from '../../entities/ActiveToons.js';
import { formatField, returnAllActiveToonsByDiscordId } from './census_functions.js';

export const data = new SlashCommandBuilder()
  .setName('whois')
  .setDescription('Discovers toons related to a Discord user.')
  .addUserOption(option =>
    option.setName('user').setDescription('User to search for').setRequired(false),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  try {
    const { options } = interaction;

    let discordId = interaction.user.id as string;
    let toonsData: ActiveToons[] = [];

    if (options.get('user')) {
      discordId = options.get('user')?.value as string;
    }

    toonsData = await returnAllActiveToonsByDiscordId(discordId);

    if (toonsData.length === 0) {
      throw new Error(':x: No toons found for this user.');
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
      const sortedToonNames = formatField(sortedToons.map(toon => _.capitalize(toon.Name)));
      const sortedToonClasses = formatField(sortedToons.map(toon => toon.CharacterClass));
      const sortedToonLevels = formatField(sortedToons.map(toon => toon.Level.toString()));

      return currentEmbed.addFields(
        {
          name: status,
          value: `${toonsWithStatus.length} character(s) declared as ${status.toLowerCase()}(s)`,
          inline: false,
        },
        { name: ':bust_in_silhouette: Name', value: sortedToonNames, inline: true },
        { name: ':crossed_swords: Class', value: sortedToonClasses, inline: true },
        { name: ':arrow_double_up: Level', value: sortedToonLevels, inline: true },
      );
    }, embed);

    await interaction.reply({ embeds: [embedBuilder], flags: MessageFlags.Ephemeral });
  }
  catch (error) {
    if (error instanceof Error) {
      return interaction.reply({ content: error.message, flags: MessageFlags.Ephemeral });
    }
  }
}
