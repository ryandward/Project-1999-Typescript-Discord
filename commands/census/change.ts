import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import _ from 'lodash';
import { ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { ActiveToons } from '../../entities/ActiveToons.js';
import { Status } from '../../entities/Status.js';

async function validStatuses() {
  return (await AppDataSource.manager.find(Status)).filter(status => status.Status !== 'Dropped');
}

const statuses = await validStatuses();

export const data = new SlashCommandBuilder()
  .setName('change')
  .setDescription('Change the status of a character')
  .addStringOption(option =>
    option
      .setName('name')
      .setDescription('The name of the character')
      .setRequired(true)
      .setAutocomplete(true)
      .setMaxLength(24),
  )
  .addStringOption(option =>
    option
      .setName('status')
      .setDescription('The new status of the character')
      .setRequired(true)
      .addChoices(...statuses.map(status => ({ name: status.Status, value: status.Status }))),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  try {
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption) return;
    const discordId = interaction.user.id;

    if (focusedOption.name === 'name') {
      const choices = {
        where: {
          Name: ILike(`%${focusedOption.value}%`),
          DiscordId: discordId,
        },
        take: 10,
      };
      const toons = await AppDataSource.manager.find(ActiveToons, choices);
      await interaction.respond(toons.map(toon => ({ name: toon.Name, value: toon.Name })));
    }
  }
  catch (error) {
    console.error('Error in autocomplete:', error);
  }
}

export const execute = async (interaction: CommandInteraction) => {
  try {
    const { options } = interaction;
    const name = _.capitalize(options.get('name')?.value as string);
    const status = options.get('status')?.value as string;
    const discordId = interaction.user.id;

    const toon = await AppDataSource.manager.findOne(ActiveToons, {
      where: { DiscordId: discordId, Name: name },
    });

    if (!toon) {
      throw new Error(`:x: ${name} does not exist.`);
    }
    else {
      await AppDataSource.manager.update(
        ActiveToons,
        { DiscordId: discordId, Name: name },
        { Status: status },
      );
      return interaction.reply(
        `:white_check_mark: \`${name}\`'s status has been changed to \`${status}\`.`,
      );
    }
  }
  catch (error) {
    if (error instanceof Error) {
      return interaction.reply(error.message);
    }
  }
};
