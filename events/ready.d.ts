import { Events } from 'discord.js';
import { TSClient } from '../types';
export declare const name = Events.ClientReady;
export declare const once = true;
export declare function execute(client: TSClient): Promise<void>;
