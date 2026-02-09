/**
 * `/ping` command — measures and displays the bot's API roundtrip latency.
 *
 * @module
 */
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with :ping_pong: API latency.');

export async function execute(interaction: CommandInteraction) {
  const sent = await interaction.reply({ content: ':ping_pong: Pinging...', fetchReply: true });
  interaction.editReply(
    `:arrows_clockwise: Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`,
  );
}
