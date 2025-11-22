import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
  SlashCommandBuilder,
} from 'discord.js';
import { FindManyOptions, ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { SharedAccounts } from '../../entities/SharedModels.js';

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

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const { options } = interaction;
  const accountName = options.get('account')?.value as string;
  const password = options.get('password')?.value as string;
  const role = options.get('role')?.value as string;
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
    // Fetch or potentially create a new account
    let sharedAccount = await AppDataSource.manager.findOne(SharedAccounts, {
      where: { Account: accountName },
      relations: ['SharedToons'],
    });

    if (password || role) {
      // If there are updates to process
      if (!sharedAccount) {
        // Create new account if it does not exist
        sharedAccount = new SharedAccounts();
        sharedAccount.Account = accountName;
      }

      const changes = [];
      if (password) {
        sharedAccount.Password = password;
        changes.push(`password to \`${password}\``);
      }
      if (role) {
        sharedAccount.Role = role;
        changes.push(`role to <@&${role}>`);
      }

      await AppDataSource.manager.save(sharedAccount);
      const response = `Successfully updated ${changes.join(' and ')} for account \`${accountName}\`.`;
      await interaction.reply({ content: response, ephemeral: true });
      await interaction.followUp({
        content: `:information_source: <@${interaction.user.id}> updated the details for account \`${accountName}\`.`,
      });
      return;
    }

    // If no updates provided, retrieve account details
    if (!sharedAccount) {
      throw new Error(`No account found with the name \`${accountName}\`.`);
    }

    const toonsList =
      sharedAccount.SharedToons.map(toon => toon.Name).join(', ') || 'No toons assigned';
    const embed = new EmbedBuilder()
      .setTitle('Account Information')
      .setColor(0x0099ff)
      .addFields(
        { name: ':ledger: Account', value: `\`${accountName}\``, inline: false },
        { name: ':key: Password', value: `\`${sharedAccount.Password ?? 'N/A'}\``, inline: false },
        {
          name: ':performing_arts: Role',
          value: `<@&${sharedAccount.Role ?? 'N/A'}>`,
          inline: false,
        },
        { name: ':busts_in_silhouette: Toons', value: toonsList, inline: false },
      )
      .setTimestamp();

    // Add notes field if notes exist
    if (sharedAccount.Notes) {
      embed.addFields({ name: ':memo: Notes', value: sharedAccount.Notes, inline: false });
    }

    // Reply with the embed
    await interaction.reply({ embeds: [embed], ephemeral: true });
    await interaction.followUp({
      content: `:information_source: <@${interaction.user.id}> accessed the details for account \`${accountName}\`.`,
    });
  }
  catch (error) {
    if (error instanceof Error) {
      await interaction.reply({ content: error.message, ephemeral: true });
    }
  }
}
