import { GatewayIntentBits } from 'discord.js';
import { TSClient } from './types.js';

export const client = new TSClient({ intents: [GatewayIntentBits.Guilds] });
