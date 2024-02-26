import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.');
export async function execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    if (interaction.guild) {
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    }
    else {
        await interaction.reply('This command can only be used in a server.');
    }
}
