import 'dotenv/config';
import fs from 'node:fs';
import path from 'path';
import { initializeDataSource } from './app_data.js';
import { client } from './client.js';
import { Command } from './types.js';

await initializeDataSource();

const __dirname = import.meta.dirname;

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command: Command = await import(path.join(commandsPath, file));
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    }
    else {
      console.log(
        `[WARNING] The command at ${path.join(commandsPath, file)} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = await import(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const token = process.env.DISCORD_TOKEN;
client.login(token);
