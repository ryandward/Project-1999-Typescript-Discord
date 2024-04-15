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
    option
      .setName('account')
      .setDescription('The name of the account')
      .setRequired(true)
      .setAutocomplete(true),
  )
  .addStringOption(option =>
    option.setName('password').setDescription('The password for the account').setRequired(false),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  const member = interaction.member as GuildMember;
  try {
    const hasPermission = member?.roles.cache.some(role => role.name === 'Officer');
    if (!hasPermission) {
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

export async function execute(interaction: CommandInteraction) {
  const { options } = interaction;
  const account = options.get('account')?.value as string;
  const password = options.get('password')?.value as string;

  try {
    if (password) {
      // Set or change the account/password combo
      let sharedAccount: SharedAccounts | null = await AppDataSource.manager.findOneBy(
        SharedAccounts,
        {
          Account: account,
        },
      );
      let response = '';

      if (!sharedAccount) {
        sharedAccount = new SharedAccounts();
        sharedAccount.Account = account;
        sharedAccount.Password = password;
        response = `The password for account \`${account}\` has been set to \`${password}\`.`;
      }
      else {
        const oldPassword = sharedAccount.Password;
        sharedAccount.Account = account;
        sharedAccount.Password = password;
        response = `The password for account \`${account}\` has been updated from \`${oldPassword}\` to \`${password}\`.`;
      }
      await AppDataSource.manager.save(sharedAccount);
      await interaction.reply({
        content: response,
        ephemeral: true,
      });
      await interaction.followUp({
        content: `The password for account \`${account}\` has been set/updated.`,
      });
    }
    else {
      // Retrieve the account info
      const sharedAccount: SharedAccounts | null = await AppDataSource.manager.findOneBy(
        SharedAccounts,
        {
          Account: account,
        },
      );
      if (!sharedAccount) {
        throw new Error(`No account found with the name \`${account}\`.`);
      }
      await interaction.reply({
        content: `Account: \`${account}\`\nPassword: \`${sharedAccount.Password}\``,
        ephemeral: true,
      });
      await interaction.followUp({
        content: `:information_source: <@${interaction.user.id}> accessed the password for account \`${account}\`.`,
      });
    }
  }
  catch (error) {
    if (error instanceof Error) {
      return interaction.reply({ content: error.message, ephemeral: true });
    }
  }
}
