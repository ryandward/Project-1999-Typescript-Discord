/**
 * `/listaccounts` command — sends the officer a DM with all accessible shared accounts.
 *
 * Requires the Officer role. Filters accounts by the officer's role hierarchy,
 * generates a plain-text file listing each account with password, role, and
 * toons, and sends it via direct message. Logs access in a follow-up.
 *
 * @module
 */
import {
  AttachmentBuilder,
  CommandInteraction,
  EmbedBuilder,
  Guild,
  GuildMember,
  MessageFlags,
  SlashCommandBuilder,
  User,
} from 'discord.js';
import { Readable } from 'stream';
import { AppDataSource } from '../../app_data.js';
import { SharedAccounts } from '../../entities/SharedModels.js';

export const permissions = ['ManageGuild'];

export const data = new SlashCommandBuilder()
  .setName('listaccounts')
  .setDescription('Lists all accounts and their associated toons accessible to the user via DM');

export async function execute(interaction: CommandInteraction): Promise<void> {
  const member = interaction.member as GuildMember;
  const user = interaction.user as User;
  const guild = interaction.guild as Guild;

  try {
    // Check if the user has the Officer role
    if (!member?.roles.cache.some(memberRole => memberRole.name === 'Officer')) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setDescription('You do not have permission to use this command.');
      await interaction.reply({ embeds: [errorEmbed], flags: MessageFlags.Ephemeral });
      return;
    }

    const userRoles = member.roles.cache.map(role => role.id);
    console.log('User Roles:', userRoles);

    const accounts = await AppDataSource.manager.find(SharedAccounts, {
      relations: ['SharedToons'],
    });
    console.log('All Accounts:', accounts);

    const filteredAccounts = accounts.filter(account => {
      console.log('Account Role:', account.Role);
      return account.Role ? userRoles.includes(account.Role) : true;
    });
    console.log('Filtered Accounts:', filteredAccounts);

    let fileContent = '';
    const embeds: EmbedBuilder[] = [];
    const files: AttachmentBuilder[] = [];

    if (filteredAccounts.length === 0) {
      const noAccountsEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setDescription('No accounts are available for your current roles.');
      await interaction.reply({ embeds: [noAccountsEmbed], flags: MessageFlags.Ephemeral });
      return;
    }

    fileContent += 'Accounts and their associated toons:\n\n';

    for (const account of filteredAccounts) {
      const role = account.Role ? await guild.roles.fetch(account.Role) : null;
      const roleName = role ? role.name : 'N/A';

      fileContent += `Account: ${account.Account}\n`;
      fileContent += `  Password: ${account.Password || 'N/A'}\n`;
      fileContent += `  Role: ${roleName}\n`;
      fileContent += '  Toons:\n';
      if (account.SharedToons && account.SharedToons.length > 0) {
        for (const toon of account.SharedToons) {
          fileContent += `    - ${toon.Name}\n`;
        }
      }
      else {
        fileContent += '    - No toons assigned\n';
      }
      fileContent += '\n';
    }

    const buffer = Buffer.from(fileContent, 'utf-8');
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    const accountFile = new AttachmentBuilder(stream, { name: 'accessible_accounts.txt' });
    files.push(accountFile);

    const descriptionEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setDescription(
        'Attached is a text file containing the list of all the accounts and associated toons you have access to.',
      )
      .setTimestamp();
    embeds.push(descriptionEmbed);

    try {
      await user.send({ embeds, files });
      // Confirm that the dm was sent in the channel
      await interaction.reply({
        content: 'I\'ve sent you a DM with the account list.',
        flags: MessageFlags.Ephemeral,
      });
    }
    catch (dmError) {
      console.error('Error sending DM:', dmError);
      const errorEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(
          'Could not send you a direct message. Please make sure that direct messages are enabled for this server.',
        );
      await interaction.reply({ embeds: [errorEmbed], flags: MessageFlags.Ephemeral });
      return;
    }
    // Follow-up message
    await interaction.followUp({
      content: `:information_source: <@${interaction.user.id}> has accessed all accounts and toons that they have access to.`,
    });
  }
  catch (error) {
    console.error('Error listing accounts and toons:', error);
    const errorEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setDescription('An error occurred while trying to retrieve account information.');
    await interaction.reply({ embeds: [errorEmbed], flags: MessageFlags.Ephemeral });
  }
}
