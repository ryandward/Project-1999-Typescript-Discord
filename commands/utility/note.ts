import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  GuildMember,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import { FindManyOptions, ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { SharedToons } from '../../entities/SharedModels.js';

export const permissions = ['ManageGuild'];

export const data = new SlashCommandBuilder()
  .setName('note')
  .setDescription('Add or update notes for a shared character')
  .addStringOption(option =>
    option.setName('toon').setDescription('Character name').setRequired(true).setAutocomplete(true),
  )
  .addStringOption(option =>
    option
      .setName('notes')
      .setDescription('Notes to add (leave empty to clear notes)')
      .setRequired(false),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  const member = interaction.member as GuildMember;
  try {
    if (!member?.roles.cache.some(memberRole => memberRole.name === 'Officer')) {
      throw new Error('You do not have permission to use this command.');
    }
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption) return;

    if (focusedOption.name === 'toon') {
      const choices: FindManyOptions = {
        where: {
          Name: ILike(`%${focusedOption.value}%`),
        },
        take: 10,
      };
      const toons = await AppDataSource.manager.find(SharedToons, choices);
      await interaction.respond(
        toons
          .filter(toon => toon.Name !== null)
          .map(toon => ({ name: toon.Name, value: toon.Name })),
      );
    }
  }
  catch (error) {
    console.error('Error in autocomplete:', error);
  }
}

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const { options } = interaction;
  const toonName = options.get('toon')?.value as string;
  const notes = options.get('notes')?.value as string | undefined;
  const member = interaction.member as GuildMember;

  if (!member?.roles.cache.some(memberRole => memberRole.name === 'Officer')) {
    await interaction.reply({
      content: 'You do not have permission to use this command.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  if (!toonName) {
    await interaction.reply({
      content: 'Error: Character name must be provided.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  try {
    // Fetch the toon
    const sharedToon = await AppDataSource.manager.findOne(SharedToons, {
      where: { Name: toonName },
    });

    if (!sharedToon) {
      throw new Error(`No character found with the name \`${toonName}\`.`);
    }

    // Update or clear notes
    if (notes === undefined || notes === '') {
      sharedToon.Notes = null;
      await AppDataSource.manager.save(sharedToon);
      await interaction.reply({
        content: `Notes have been cleared for character \`${toonName}\`.`,
        flags: MessageFlags.Ephemeral,
      });
      await interaction.followUp({
        content: `:information_source: <@${interaction.user.id}> cleared notes for character \`${toonName}\`.`,
      });
    }
    else {
      sharedToon.Notes = notes;
      await AppDataSource.manager.save(sharedToon);
      await interaction.reply({
        content: `Notes have been updated for character \`${toonName}\`.\n\n**Notes:**\n${notes}`,
        flags: MessageFlags.Ephemeral,
      });
      await interaction.followUp({
        content: `:information_source: <@${interaction.user.id}> updated notes for character \`${toonName}\`.`,
      });
    }
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply({ content: error.message, flags: MessageFlags.Ephemeral });
    }
  }
}
