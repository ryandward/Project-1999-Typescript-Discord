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

export const data = new SlashCommandBuilder()
  .setName('delete_shared_toon')
  .setDescription('Delete a shared toon entry (for removing typos/mistakes)')
  .addStringOption(option =>
    option
      .setName('toon')
      .setDescription('Character name to delete')
      .setRequired(true)
      .setAutocomplete(true),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  const member = interaction.member as GuildMember;
  try {
    if (!member?.roles.cache.some(memberRole => memberRole.name === 'Officer')) {
      return;
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
    const sharedToon = await AppDataSource.manager.findOne(SharedToons, {
      where: { Name: toonName },
      relations: ['Account'],
    });

    if (!sharedToon) {
      throw new Error(`No shared toon found with the name \`${toonName}\`.`);
    }

    const accountName = sharedToon.Account?.Account || 'unknown';

    await AppDataSource.manager.remove(sharedToon);

    await interaction.reply({
      content: `:wastebasket: Deleted shared toon \`${toonName}\` (was on account \`${accountName}\`).`,
    });
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply({ content: error.message, flags: MessageFlags.Ephemeral });
    }
  }
}
