import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';
export declare const data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
export declare function autocomplete(interaction: AutocompleteInteraction): Promise<void>;
export declare function execute(interaction: CommandInteraction): Promise<void>;
