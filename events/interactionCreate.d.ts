import { Events, Interaction } from 'discord.js';
export declare const name = Events.InteractionCreate;
export declare function execute(interaction: Interaction): Promise<void>;
