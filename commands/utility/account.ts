import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import _ from 'lodash';
import { FindManyOptions, ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { SharedAccounts } from '../../entities/SharedAccounts.js';
import { SharedToons } from '../../entities/SharedToons.js';

export const permissions = ['ManageGuild'];

export const data = new SlashCommandBuilder()
  .setName('login')
  .setDescription('Get or assign a toon to a login account')
  .addStringOption(option =>
    option
      .setName('toon')
      .setDescription('The name of the toon')
      .setRequired(true)
      .setAutocomplete(true),
  )
  .addStringOption(option =>
    option
      .setName('account')
      .setDescription('The nameof the account')
      .setRequired(false)
      .setAutocomplete(true),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  try {
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
  const toonName = _.capitalize(options.get('toon')?.value as string);
  const accountName = options.get('account')?.value as string;

  try {
    let sharedToon = await AppDataSource.manager.findOneBy(SharedToons, { Name: toonName });

    if (!sharedToon && accountName) {
      // No existing toon, create a new one
      const sharedAccount = await AppDataSource.manager.findOneBy(SharedAccounts, {
        Account: accountName,
      });
      if (!sharedAccount) {
        throw new Error(`No account found with the name \`${accountName}\`.`);
      }

      sharedToon = new SharedToons();
      sharedToon.Name = toonName;
      sharedToon.Account = sharedAccount;
      await AppDataSource.manager.save(sharedToon);

      await interaction.reply({
        content: `A new toon \`${toonName}\` has been created and linked to account \`${accountName}\`.`,
        ephemeral: false,
      });
    }
    else if (sharedToon && accountName) {
      // Existing toon, update the account
      const sharedAccount = await AppDataSource.manager.findOneBy(SharedAccounts, {
        Account: accountName,
      });
      if (!sharedAccount) {
        throw new Error(`No account found with the name \`${accountName}\`.`);
      }

      sharedToon.Account = sharedAccount;
      await AppDataSource.manager.save(sharedToon);

      await interaction.reply({
        content: `The account for \`${toonName}\` has been updated to \`${accountName}\`.`,
        ephemeral: false,
      });
    }
    else if (sharedToon) {
      // Display the linked account info
      if (!sharedToon.Account) {
        throw new Error(`Toon \`${toonName}\` is not linked to any account.`);
      }
      const accountInfo = await AppDataSource.manager.findOneBy(SharedAccounts, {
        Account: sharedToon.Account.Account,
      });
      if (!accountInfo) {
        throw new Error(`Account information for \`${toonName}\` could not be retrieved.`);
      }
      await interaction.reply({
        content: `Toon: \`${toonName}\`\nAccount: \`${accountInfo.Account}\`\nPassword: \`${accountInfo.Password ?? 'N/A'}\``,
        ephemeral: true,
      });
    }
    else {
      throw new Error(
        `Toon \`${toonName}\` does not exist and no account name was provided to create one.`,
      );
    }
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply({ content: error.message, ephemeral: true });
    }
  }
}
