import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { AppDataSource } from '../../app_data.js';
import { Plat } from '../../entities/Plat.js';

export const data = new SlashCommandBuilder()
  .setName('plat')
  .setDescription('Check the current balance.');

export async function execute(interaction: CommandInteraction) {
  try {
    const totalBalance = await AppDataSource.manager
      .createQueryBuilder(Plat, 'plat')
      .select('SUM(plat.amount)', 'total')
      .getRawOne();

    const embed = new EmbedBuilder()
      .setTitle('Guild Plat Balance')
      .setDescription(`The current guild plat balance is **${totalBalance.total}** plat.`)
      .setColor('Blue');

    await interaction.reply({ embeds: [embed] });
  }
  catch (error) {
    console.error('Error in plat:', error);
    await interaction.reply('An error occurred while retrieving the balance.');
  }
}
