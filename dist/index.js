// Import the necessary discord.js classes and types
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();
// Create a new client instance with intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Typing the client for the ready event
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user?.tag}`);
});
// Login to Discord with your app's token
const token = process.env.DISCORD_TOKEN;
if (!token)
    throw new Error('Token not found in environment');
client.login(token);
export const commands = new Collection();
export const foldersPath = path.join(__dirname, 'commands');
export const commandFolders = fs.readdirSync(foldersPath);
// The outer loop cannot be async, so we use an IIFE for async imports
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const stat = fs.lstatSync(filePath);
        // Only import the file if it's not a directory
        if (!stat.isDirectory()) {
            const command = (await import(filePath)).default;
            if ('data' in command && 'execute' in command) {
                commands.set(command.data.name, command);
            }
            else {
                console.error(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}
