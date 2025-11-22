import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
  SlashCommandBuilder,
} from 'discord.js';
import _ from 'lodash';
import { FindManyOptions, ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { SharedAccounts, SharedToons } from '../../entities/SharedModels.js';

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
      .setDescription('WARNING: Assigns a toon to an account. Do not use to view account info.')
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

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const { options } = interaction;
  const toonName = _.capitalize(options.get('toon')?.value as string);
  const accountName = options.get('account')?.value as string;

  const member = interaction.member as GuildMember;
  try {
    // Check if the user has permission to set account information
    if (accountName && !member?.roles.cache.some(role => role.name === 'Officer')) {
      throw new Error('You do not have permission to set account information.');
    }
    let sharedToon = await AppDataSource.manager.findOne(SharedToons, {
      where: { Name: toonName },
      relations: ['Account'],
    });
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
      console.log(sharedToon);

      // Display the linked account info
      const accountInfo = await AppDataSource.manager.findOneBy(SharedAccounts, {
        Account: sharedToon.Account.Account,
      });

      const displayPermissions = accountInfo?.Role;
      if (displayPermissions) {
        // Find the required role in the guild
        const requiredRole = member.guild.roles.cache.get(displayPermissions);
        if (!requiredRole) {
          throw new Error('The required role for this account could not be found.');
        }
        // Find the member's highest role
        const memberHighestRole = member.roles.highest;
        // Allow access if member's highest role is equal or higher in hierarchy
        if (memberHighestRole.position < requiredRole.position) {
          throw new Error('You do not have permission to view this account information.');
        }
      }

      if (!sharedToon.Account) {
        throw new Error(`Toon \`${toonName}\` is not linked to any account.`);
      }

      if (!accountInfo) {
        throw new Error(`Account information for \`${toonName}\` could not be retrieved.`);
      }

      // Create a new embed using EmbedBuilder
      const embed = new EmbedBuilder()
        .setTitle('Account Information')
        .setColor(0x0099ff)
        .addFields(
          { name: ':bust_in_silhouette: Toon', value: `\`${toonName}\``, inline: false },
          { name: ':ledger: Account', value: `\`${accountInfo.Account}\``, inline: false },
          { name: ':key: Password', value: `\`${accountInfo.Password ?? 'N/A'}\``, inline: false },
          {
            name: ':performing_arts: Role',
            value: `<@&${accountInfo.Role ?? 'N/A'}>`,
            inline: false,
          },
        )
        .setTimestamp();

      // Add notes field if notes exist on the toon
      if (sharedToon.Notes) {
        embed.addFields({ name: ':memo: Notes', value: sharedToon.Notes, inline: false });
      }
      // Reply with the embed
      await interaction.reply({ embeds: [embed], ephemeral: true });

      await interaction.followUp({
        content: `:information_source: <@${member.id}> accessed account information for \`${toonName}\`.`,
        ephemeral: false,
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
