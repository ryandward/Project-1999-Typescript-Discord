import { SlashCommandBuilder } from 'discord.js';
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with :ping_pong: API latency.'),
    async execute(interaction) {
        const clientPing = interaction.client.ws.ping;
        await interaction.reply(`:ping_pong: API Latency is ${Math.round(clientPing)} ms`);
    },
};
