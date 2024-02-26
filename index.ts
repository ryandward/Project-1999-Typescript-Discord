import { GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command, TSClient } from './types.js';

const baseDir = fileURLToPath(new URL('.', import.meta.url));

const client = new TSClient({ intents: [GatewayIntentBits.Guilds] });

const foldersPath = path.join(baseDir, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: Command = await import(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    }
    else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

const eventsPath = path.join(baseDir, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = await import(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));

  }
  else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const token = process.env.DISCORD_TOKEN;
client.login(token);
