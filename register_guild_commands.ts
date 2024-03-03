import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { initializeDataSource } from './app_data.js';
import { Command } from './types.js';

await initializeDataSource();

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined`);
  }
  return value;
}

const token = getEnvVar('DISCORD_TOKEN');
const botSelf = getEnvVar('BOT_SELF');
const guildId = getEnvVar('GUILD_ID');

let rest: REST;

switch (true) {
  case !token:
    throw new Error('DISCORD_TOKEN is not defined');
  case !botSelf:
    throw new Error('BOT_SELF is not defined');
  case !guildId:
    throw new Error('GUILD_ID is not defined');
  default:
    rest = new REST({ version: '10' }).setToken(token);
}

// Construct and prepare an instance of the REST module
rest = new REST().setToken(token);

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const baseDir = fileURLToPath(new URL('.', import.meta.url));
const foldersPath = path.join(baseDir, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: Command = await import(filePath);
    if ('data' in command || 'execute' in command) {
      commands.push(command.data.toJSON());
    }
    else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

try {
  console.log(`Started refreshing ${commands.length} application (/) commands.`);

  // The put method is used to fully refresh all commands in the guild with the current set
  const data = (await rest.put(Routes.applicationGuildCommands(botSelf, guildId), {
    body: commands,
  })) as RESTPostAPIChatInputApplicationCommandsJSONBody[];

  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
}
catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
