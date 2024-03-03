import { Client, Collection, } from 'discord.js';
export class TSClient extends Client {
    commands = new Collection();
}
