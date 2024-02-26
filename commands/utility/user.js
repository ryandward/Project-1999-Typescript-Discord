// Importing required classes from discord.js with ES module syntax
import { SlashCommandBuilder } from 'discord.js';
// Using export const to define the command
export const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.');
export async function execute(interaction) {
    const joinedAt = interaction.member?.joinedAt || 'unknown date';
    await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${joinedAt}.`);
}
