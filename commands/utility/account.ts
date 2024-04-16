import {
  AutocompleteInteraction,
  CommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from 'discord.js';
import { FindManyOptions, ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { SharedAccounts } from '../../entities/SharedAccounts.js';

export const permissions = ['ManageGuild'];

export const data = new SlashCommandBuilder()
  .setName('account')
  .setDescription('Get or set login information for a shared account')
  .addStringOption(option =>
    option.setName('account').setDescription('Account name').setRequired(true).setAutocomplete(true),
  )
  .addStringOption(option =>
    option.setName('password').setDescription('SET the password').setRequired(false),
  )
  .addRoleOption(option =>
    option.setName('role').setDescription('SET the required role').setRequired(false),
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

export async function execute(interaction: CommandInteraction): Promise<void> {
  const { options } = interaction;
  const account = options.get('account')?.value as string | undefined;
  const password = options.get('password')?.value as string | undefined;
  const role = options.get('role')?.value as string | undefined;
  const member = interaction.member as GuildMember;
  if (!member?.roles.cache.some(memberRole => memberRole.name === 'Officer')) {
    throw new Error('You do not have permission to use this command.');
  }

  if (!account) {
    await interaction.reply({ content: 'Error: Account name must be provided.', ephemeral: true });
    return;
  }

  try {
    // Fetch the current account details from the database
    let sharedAccount = await AppDataSource.manager.findOneBy(SharedAccounts, { Account: account });

    if (password || role) {
      if (!sharedAccount) {
        // Create new account if it does not exist
        sharedAccount = new SharedAccounts();
        sharedAccount.Account = account;
      }
      // Update password and role as provided
      const changes = [];
      if (password) {
        sharedAccount.Password = password;
        changes.push(`password to \`${password}\``);
      }
      if (role) {
        sharedAccount.Role = role;
        changes.push(`role to <@&${role}>`);
      }

      const response = `Successfully updated ${changes.join(' and ')} for account \`${account}\`.`;
      const followUp = `:information_source: <@${interaction.user.id}> updated the details for account \`${account}\`.`;

      await AppDataSource.manager.save(sharedAccount);
      await interaction.reply({ content: response, ephemeral: true });
      await interaction.followUp({ content: followUp });
    }
    else {
      // Retrieve account details if no updates provided
      if (!sharedAccount) {
        throw new Error(`No account found with the name \`${account}\`.`);
      }
      const accountDetails = `Account: \`${account}\`\nPassword: \`${sharedAccount.Password ?? 'N/A'}\`\nRole: <@&${sharedAccount.Role ?? 'N/A'}>`;
      await interaction.reply({ content: accountDetails, ephemeral: true });
      await interaction.followUp({
        content: `:information_source: <@${interaction.user.id}> accessed the details for account \`${account}\`.`,
      });
    }
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply({ content: error.message, ephemeral: true });
    }
  }
}
