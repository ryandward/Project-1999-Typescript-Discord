import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const __dirname = import.meta.dirname;

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Lists all commands and their descriptions.');

export const execute = async (interaction: CommandInteraction) => {
  const commandsPath = path.join(__dirname, '..');
  const commandFolders = fs.readdirSync(commandsPath);
  const embeds: EmbedBuilder[] = [];

  for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
      const commands = [];

      for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        try {
          const command = await import(filePath);
          if (command.data && command.data.name && command.data.description) {
            commands.push(command);
          }
        }
        catch (error) {
          console.error(`Failed to load command ${file}:`, error);
        }
      }

      if (commands.length > 0) {
        const embed = new EmbedBuilder()
          .setTitle(`${_.capitalize(folder)} Commands`)
          .setDescription('Here are the commands available in this category:')
          .setColor('Blue');

        commands.forEach(command => {
          embed.addFields({
            name: `/${command.data.name}`,
            value: command.data.description,
            inline: false,
          });
        });

        embeds.push(embed);
      }
    }
  }

  await interaction.reply({
    embeds: embeds,
    ephemeral: true,
  });

  const followUpEmbed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(':magic_wand: Enhance Your `/commands` Experience! :sparkles:')
    .setDescription('Use the **Tab** key to:')
    .addFields(
      { name: '1. Auto-complete', value: 'Speed up your inputs.' },
      { name: '2. Cycle through options', value: 'For quick selection.' },
      { name: '3. Navigate subcommands', value: 'Efficiently explore commands.' },
      {
        name: '\u200B',
        value:
          ':arrow_up_down: **Tip:** Use **Up/Down arrow keys** to seamlessly select from the auto-suggested options.',
      },
    )
    .setFooter({
      text: 'Why are migrating to `/commands`? Frankly, malformed `!commands` lock up the bot and database. Slash commands are more reliable and faster. Plus, they are easier to use. Try it out!',
    });

  await interaction.followUp({
    embeds: [followUpEmbed],
    ephemeral: true,
  });
};
