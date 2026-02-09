/**
 * `/income` command — records a guild bank income (platinum deposit).
 *
 * Requires `ManageGuild` permission. Creates a `Plat` record with a
 * positive amount. Displays a green embed confirming the transaction.
 *
 * @module
 */
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import { AppDataSource } from '../../app_data.js';
import { Plat } from '../../entities/Plat.js';

export const permissions = 'ManageGuild';

export const data = new SlashCommandBuilder()
  .setName('income')
  .setDescription('Record an income transaction')
  .addIntegerOption(option =>
    option.setName('amount').setDescription('The amount of the income').setRequired(true),
  )
  .addStringOption(option =>
    option
      .setName('description')
      .setDescription('A description of the transaction')
      .setRequired(true)
      .setMaxLength(255),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  try {
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member || !member.permissions.has([permissions])) {
      throw new Error('You do not have permission to use this command.');
    }

    const { options } = interaction;
    const amount = options.get('amount')?.value as number;
    const description = options.get('description')?.value as string;
    const discordId = interaction.user.id;

    const plat = new Plat();
    plat.DiscordId = discordId;
    plat.Amount = amount;
    plat.Description = description;

    await AppDataSource.manager.save(plat);

    const embed = new EmbedBuilder()
      .setTitle('Income Ledger Entry')
      .setDescription(`<@${discordId}> recorded an income.`)
      .addFields(
        { name: ':scroll: Description', value: `\`\`\`${description}\`\`\`` },
        { name: ':moneybag: Plat', value: `\`\`\`${amount.toString()}\`\`\`` },
      )
      .setColor('Green');

    await interaction.reply({ embeds: [embed] });
  }
  catch (error) {
    console.error('Error in income:', error);
    await interaction.reply({
      content: 'An error occurred while processing your command.',
      flags: MessageFlags.Ephemeral,
    });
  }
}
