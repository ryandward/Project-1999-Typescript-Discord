import { AutocompleteInteraction, CommandInteraction, Events } from 'discord.js';
export const name = Events.InteractionCreate;
export async function execute(interaction) {
    if (interaction instanceof CommandInteraction) {
        // if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command || !command.execute) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
        }
    }
    else if (interaction instanceof AutocompleteInteraction) {
        // if (!interaction.isAutocomplete()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command || !command.autocomplete) {
            console.error(`No autocomplete handler for ${interaction.commandName}`);
            return;
        }
        try {
            await command.autocomplete(interaction);
        }
        catch (error) {
            console.error(error);
        }
    }
}
