import { SlashCommandBuilder } from 'discord.js';
export declare function declareTemplate(status: string): Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
export declare function declare(DiscordId: string, Status: string, Name: string, Level: number, CharacterClass: string): Promise<string>;
export declare function suggestCharacterClasses(partialName: string): Promise<any[]>;
export declare function insertUser(DiscordId: string): Promise<boolean>;
export declare function toonExists(Name: string): Promise<string>;
