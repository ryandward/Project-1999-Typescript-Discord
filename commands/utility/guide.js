import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Search discordjs.guide!')
    .addStringOption(option => option.setName('query').setDescription('Phrase to search for').setAutocomplete(true))
    .addStringOption(option => option.setName('version').setDescription('Version to search in').setAutocomplete(true));
export async function autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    let choices;
    if (focusedOption.name === 'query') {
        choices = [
            'Popular Topics: Threads',
            'Sharding: Getting started',
            'Library: Voice Connections',
            'Interactions: Replying to slash commands',
            'Popular Topics: Embed preview',
        ];
    }
    if (focusedOption.name === 'version') {
        choices = ['v9', 'v11', 'v12', 'v13', 'v14'];
    }
    if (!choices)
        return;
    const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
    await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
}
export async function execute(interaction) {
    const { options } = interaction;
    const query = options.get('query')?.value;
    const version = options.get('version')?.value;
    await interaction.reply(`https://discordjs.guide/${version}/search?q=${encodeURIComponent(query)}`);
}
