import { GatewayIntentBits } from 'discord.js';
import { TSClient } from './types.js';

/**
 * Singleton Discord client instance used throughout the application.
 *
 * Configured with the `Guilds` intent, which is sufficient for slash-command
 * interactions and guild member lookups. Imported by the bootstrap module
 * (`index.ts`) and all event handlers that need access to the client.
 */
export const client = new TSClient({ intents: [GatewayIntentBits.Guilds] });
