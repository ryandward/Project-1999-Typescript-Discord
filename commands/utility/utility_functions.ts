import {
  ButtonInteraction,
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  MessageFlags,
} from 'discord.js';
import { AppDataSource } from '../../app_data.js';
import { SharedAccounts, SharedToons } from '../../entities/SharedModels.js';
// import { SharedToons } from '../../entities/SharedToons.js';

export async function loginLogic(
  interaction: CommandInteraction | ButtonInteraction,
  toonName: string,
  accountName?: string,
): Promise<void> {
  // Ensure interaction is from a guild and member is a GuildMember
  const member = interaction.member as GuildMember;
  if (!member) {
    throw new Error('Interaction did not occur in a guild or member is not available.');
  }

  // Check permission if setting account info
  if (accountName && !member.roles.cache.some(role => role.name === 'Officer')) {
    throw new Error('You do not have permission to set account information.');
  }

  let sharedToon = await AppDataSource.manager.findOne(SharedToons, {
    where: { Name: toonName },
    relations: ['Account'],
  });

  if (!sharedToon && accountName) {
    // No toon found; create a new one and link to the specified account
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
    // Update the existing toon's account
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
    // Display account information
    const accountInfo = await AppDataSource.manager.findOneBy(SharedAccounts, {
      Account: sharedToon.Account.Account,
    });

    const displayPermissions = accountInfo?.Role;
    if (displayPermissions) {
      const requiredRole = member.guild.roles.cache.get(displayPermissions);
      if (!requiredRole) {
        throw new Error('The required role for this account could not be found.');
      }
      const memberHighestRole = member.roles.highest;
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

    const embed = new EmbedBuilder()
      .setTitle('Account Information')
      .setColor(0x0099ff)
      .addFields(
        { name: ':bust_in_silhouette: Toon', value: `\`${toonName}\``, inline: false },
        { name: ':ledger: Account', value: `\`${accountInfo.Account}\``, inline: false },
        { name: ':key: Password', value: `\`${accountInfo.Password ?? 'N/A'}\``, inline: false },
        { name: ':performing_arts: Role', value: `<@&${accountInfo.Role ?? 'N/A'}>`, inline: false },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    await interaction.followUp({
      content: `:information_source: <@${member.id}> accessed account information for \`${toonName}\`.`,
      ephemeral: false,
    });
  }
  else {
    // No toon found, no account provided
    throw new Error(
      `Toon \`${toonName}\` does not exist and no account name was provided to create one.`,
    );
  }
}
