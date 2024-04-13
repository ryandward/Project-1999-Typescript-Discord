import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { AppDataSource } from '../../app_data.js';
import { Plat } from '../../entities/Plat.js';

export const data = new SlashCommandBuilder()
  .setName('expense')
  .setDescription('Record an expense transaction')
  .addIntegerOption(option =>
    option.setName('amount').setDescription('The amount of the expense').setRequired(true),
  )
  .addStringOption(option =>
    option
      .setName('description')
      .setDescription('A description of the transaction')
      .setRequired(true)
      .setMaxLength(255),
  );

export async function execute(interaction: CommandInteraction) {
  try {
    // Check if the member has the required roles
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member || !member.permissions.has(['ManageGuild'])) {
      throw new Error('You do not have permission to use this command.');
    }

    const { options } = interaction;
    const amount = options.get('amount')?.value as number;
    const description = options.get('description')?.value as string;
    const discordId = interaction.user.id;

    const plat = new Plat();
    plat.DiscordId = discordId;
    plat.Amount = -amount;
    plat.Description = description;

    await AppDataSource.manager.save(plat);

    const embed = new EmbedBuilder()
      .setTitle('Expense Ledger Entry')
      .setDescription(`<@${discordId}> recorded an expense.`)
      .addFields(
        { name: ':scroll: Description', value: `\`\`\`${description}\`\`\`` },
        { name: ':money_with_wings: Plat', value: `\`\`\`${amount.toString()}\`\`\`` },
      )
      .setColor('Red');

    await interaction.reply({ embeds: [embed] });
  }
  catch (error) {
    console.error('Error in expense:', error);
  }
}
