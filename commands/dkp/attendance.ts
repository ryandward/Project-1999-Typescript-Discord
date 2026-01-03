import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import { ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { Attendance } from '../../entities/Attendance.js';
import { Census } from '../../entities/Census.js';
import { ClassDefinitions } from '../../entities/ClassDefinitions.js';
import { Dkp } from '../../entities/Dkp.js';
import { Raids } from '../../entities/Raids.js';

export const data = new SlashCommandBuilder()
  .setName('attendance')
  .setDescription('Record attendance from /who logs')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
  .addStringOption(option =>
    option
      .setName('raid')
      .setDescription('Raid name or DKP modifier value')
      .setRequired(true)
      .setAutocomplete(true),
  )
  .addStringOption(option =>
    option.setName('logs').setDescription('Paste your /who output here').setRequired(true),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  try {
    const focusedValue = interaction.options.getFocused();

    const raids = await AppDataSource.manager.find(Raids, {
      where: { Raid: ILike(`%${focusedValue}%`) },
      take: 25,
    });

    return await interaction.respond(
      raids.map(raid => ({
        name: `${raid.Raid} (${raid.Modifier} DKP)`,
        value: raid.Raid,
      })),
    );
  }
  catch (error) {
    console.error('Error in attendance autocomplete:', error);
  }
}

interface ParsedPlayer {
  timestamp: Date;
  level: number | null;
  className: string | null;
  name: string;
  guild: string | null;
}

function parseWhoLogs(logs: string): ParsedPlayer[] {
  const players: ParsedPlayer[] = [];
  const lines = logs.split('\n');

  // Regex patterns from Python code
  const timestampRe = /^\[([^\]]+)\]/;
  const levelClassRe = /(?<=(?<!^)\[)[^\]]*(?=\])/;
  const nameRe = /(?<=\] )[^[]+?(?=[ <(])/;
  const guildRe = /(?<=<)[^>]*(?=>)/;

  for (const rawLine of lines) {
    let line = rawLine.trim();

    if (line.length === 0) continue;

    // Skip lines without guild tags (unless ANONYMOUS)
    if ((!line.includes('<') || !line.includes('>')) && !line.includes('ANONYMOUS')) {
      continue;
    }

    // Clean up the line
    line = line.replace(/ AFK /g, '');
    line = line.replace(/ LFG/g, '');
    line = line.replace(/ <LINKDEAD>/g, '');

    // Parse timestamp
    const timestampMatch = line.match(timestampRe);
    if (!timestampMatch) continue;

    let timestamp: Date;
    try {
      // EQ format: "Thu May 25 22:10:50 2023"
      timestamp = new Date(timestampMatch[1]);
      if (isNaN(timestamp.getTime())) {
        timestamp = new Date();
      }
    }
    catch {
      timestamp = new Date();
    }

    // Parse level/class - looking for [60 High Priest] or [ANONYMOUS]
    const levelClassMatch = line.match(levelClassRe);
    let level: number | null = null;
    let className: string | null = null;

    if (levelClassMatch) {
      const parts = levelClassMatch[0].trim().split(' ');
      if (parts[0] === 'ANONYMOUS') {
        level = null;
        className = null;
      }
      else if (parts.length >= 2) {
        level = parseInt(parts[0], 10) || null;
        className = parts.slice(1).join(' ');
      }
    }

    // Parse name
    const nameMatch = line.match(nameRe);
    if (!nameMatch) continue;
    const name = nameMatch[0].trim();

    // Parse guild
    const guildMatch = line.match(guildRe);
    const guild = guildMatch ? guildMatch[0] : null;

    players.push({
      timestamp,
      level,
      className,
      name,
      guild,
    });
  }

  return players;
}

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  try {
    const raidName = interaction.options.getString('raid', true);
    const logs = interaction.options.getString('logs', true);

    // Get raid modifier
    let modifier: number;
    const parsedModifier = parseInt(raidName, 10);

    if (!isNaN(parsedModifier)) {
      // Direct DKP value provided
      modifier = parsedModifier;
    }
    else {
      // Look up raid in database
      const raid = await AppDataSource.manager.findOne(Raids, {
        where: { Raid: raidName },
      });

      if (!raid || raid.Modifier === null) {
        await interaction.editReply(`\`${raidName}\` not found in raids table. Ask Rahmani.`);
        return;
      }

      modifier = raid.Modifier;
    }

    // Parse the /who logs
    const players = parseWhoLogs(logs);

    if (players.length === 0) {
      await interaction.editReply('No valid player entries found in the logs.');
      return;
    }

    // Get census data for matching
    const census = await AppDataSource.manager.find(Census);
    const classDefinitions = await AppDataSource.manager.find(ClassDefinitions);

    const seenDiscordIds: Set<string> = new Set();
    const successfulPlayers: string[] = [];
    const rejectedLines: string[] = [];

    for (const player of players) {
      // Find player in census
      const censusEntry = census.find(c => c.Name === player.name);

      if (!censusEntry || !censusEntry.DiscordId) {
        rejectedLines.push(`${player.name} - Not registered`);
        continue;
      }

      const discordId = censusEntry.DiscordId;

      // Prevent double counting
      if (seenDiscordIds.has(discordId)) {
        continue;
      }
      seenDiscordIds.add(discordId);

      // Get character class from class_definitions if we have level/class info
      // (kept for potential future use - updating census level/class)
      if (player.className) {
        const classDef = classDefinitions.find(cd => cd.ClassName === player.className);
        if (classDef) {
          // Could update census level/class here if needed
          void classDef;
        }
      }

      // Insert attendance record
      const attendance = new Attendance();
      attendance.Date = player.timestamp;
      attendance.Raid = raidName;
      attendance.Name = player.name;
      attendance.DiscordId = discordId;
      attendance.Modifier = modifier.toString();

      await AppDataSource.manager.save(attendance);

      // Update DKP
      await AppDataSource.manager
        .createQueryBuilder()
        .update(Dkp)
        .set({ EarnedDkp: () => `earned_dkp + ${modifier}` })
        .where('discord_id = :discordId', { discordId })
        .execute();

      successfulPlayers.push(`<@${discordId}>`);
    }

    // Build response
    const embed = new EmbedBuilder()
      .setTitle(':dragon: Attendance Recorded')
      .setColor('Green')
      .setTimestamp();

    if (successfulPlayers.length > 0) {
      embed.setDescription(
        `${successfulPlayers.join(', ')} earned \`${modifier}\` DKP for \`${raidName}\``,
      );
    }

    if (rejectedLines.length > 0) {
      const rejectedText = rejectedLines.slice(0, 20).join('\n');
      embed.addFields({
        name: ':question: Unregistered Players',
        value: `\`\`\`\n${rejectedText}\n\`\`\``,
      });
    }

    embed.addFields(
      { name: 'Recorded', value: successfulPlayers.length.toString(), inline: true },
      { name: 'Rejected', value: rejectedLines.length.toString(), inline: true },
    );

    await interaction.editReply({ embeds: [embed] });

    // Add reaction equivalent - we can't add reactions to slash command replies easily
    // but the embed serves as confirmation
  }
  catch (error) {
    console.error('Error in attendance execute:', error);
    if (error instanceof Error) {
      await interaction.editReply({ content: `:x: Error: ${error.message}` });
    }
  }
}
