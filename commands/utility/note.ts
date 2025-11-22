import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from 'discord.js';
import { FindManyOptions, ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { SharedAccounts } from '../../entities/SharedModels.js';

export const permissions = ['ManageGuild'];

export const data = new SlashCommandBuilder()
  .setName('note')
  .setDescription('Add or update notes for a shared account')
  .addStringOption(option =>
    option.setName('account').setDescription('Account name').setRequired(true).setAutocomplete(true),
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

    if (focusedOption.name === 'account') {
      const choices: FindManyOptions = {
        where: {
          Account: ILike(`%${focusedOption.value}%`),
        },
        take: 10,
      };
      const accounts = await AppDataSource.manager.find(SharedAccounts, choices);
      await interaction.respond(
        accounts
          .filter(account => account.Account !== null)
          .map(account => ({ name: account.Account, value: account.Account })),
      );
    }
  }
  catch (error) {
    console.error('Error in autocomplete:', error);
  }
}

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const { options } = interaction;
  const accountName = options.get('account')?.value as string;
  const notes = options.get('notes')?.value as string | undefined;
  const member = interaction.member as GuildMember;

  if (!member?.roles.cache.some(memberRole => memberRole.name === 'Officer')) {
    await interaction.reply({
      content: 'You do not have permission to use this command.',
      ephemeral: true,
    });
    return;
  }

  if (!accountName) {
    await interaction.reply({ content: 'Error: Account name must be provided.', ephemeral: true });
    return;
  }

  try {
    // Fetch the account
    const sharedAccount = await AppDataSource.manager.findOne(SharedAccounts, {
      where: { Account: accountName },
    });

    if (!sharedAccount) {
      throw new Error(`No account found with the name \`${accountName}\`.`);
    }

    // Update or clear notes
    if (notes === undefined || notes === '') {
      sharedAccount.Notes = null;
      await AppDataSource.manager.save(sharedAccount);
      await interaction.reply({
        content: `Notes have been cleared for account \`${accountName}\`.`,
        ephemeral: true,
      });
      await interaction.followUp({
        content: `:information_source: <@${interaction.user.id}> cleared notes for account \`${accountName}\`.`,
      });
    }
    else {
      sharedAccount.Notes = notes;
      await AppDataSource.manager.save(sharedAccount);
      await interaction.reply({
        content: `Notes have been updated for account \`${accountName}\`.\n\n**Notes:**\n${notes}`,
        ephemeral: true,
      });
      await interaction.followUp({
        content: `:information_source: <@${interaction.user.id}> updated notes for account \`${accountName}\`.`,
      });
    }
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply({ content: error.message, ephemeral: true });
    }
  }
}
