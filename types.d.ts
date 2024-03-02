import { AutocompleteInteraction, Client, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js';
export interface Command {
    data: SlashCommandBuilder;
    execute?(interaction: CommandInteraction): Promise<void>;
    autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
}
export declare class TSClient extends Client {
    commands: Collection<string, Command>;
}
