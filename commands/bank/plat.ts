import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { AppDataSource } from '../../app_data.js';
import { Plat } from '../../entities/Plat.js';

export const permissions = 'ManageGuild';

export const data = new SlashCommandBuilder()
  .setName('plat')
  .setDescription('Check or adjust the current balance.')
  .addIntegerOption(option =>
    option.setName('amount').setDescription('The amount to adjust the balance by'),
  );

export async function execute(interaction: CommandInteraction) {
  try {
    const { options } = interaction;
    const amount = options.get('amount')?.value as number;

    if (amount !== undefined) {
      // Check if the member has the required roles
      const member = await interaction.guild?.members.fetch(interaction.user.id);
      if (!member || !member.permissions.has([permissions])) {
        throw new Error('You do not have permission to use this command.');
      }

      const discordId = interaction.user.id;

      // Calculate the current total balance
      const totalBalance = await AppDataSource.manager
        .createQueryBuilder(Plat, 'plat')
        .select('SUM(plat.amount)', 'total')
        .getRawOne();

      // Calculate the difference between the new amount and the current total balance
      const difference = amount - parseInt(totalBalance.total);

      const plat = new Plat();
      plat.DiscordId = discordId;
      plat.Amount = difference;

      await AppDataSource.manager.save(plat);

      const embed = new EmbedBuilder()
        .setTitle('Plat Balance Adjustment')
        .setDescription(`<@${discordId}> adjusted the plat balance.`)
        .addFields({
          name: ':money_with_wings: Plat',
          value: `\`\`\`${amount.toLocaleString()}\`\`\``,
        })
        .setColor('Blue');

      await interaction.reply({ embeds: [embed] });
    }
    else {
      const totalBalance = await AppDataSource.manager
        .createQueryBuilder(Plat, 'plat')
        .select('SUM(plat.amount)', 'total')
        .getRawOne();

      const embed = new EmbedBuilder()
        .setTitle('Guild Plat Balance')
        .setDescription(
          `The current guild plat balance is **${parseInt(totalBalance.total).toLocaleString()}** plat.`,
        )
        .setColor('Blue');

      await interaction.reply({ embeds: [embed] });
    }
  }
  catch (error) {
    console.error('Error in plat:', error);
    await interaction.reply('An error occurred while retrieving or adjusting the balance.');
  }
}
