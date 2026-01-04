import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from 'discord.js';
import { ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { SelfRoles } from '../../entities/SelfRoles.js';

export const data = new SlashCommandBuilder()
  .setName('add')
  .setDescription('Add a role to yourself')
  .addStringOption(option =>
    option.setName('role').setDescription('The role to add').setRequired(true).setAutocomplete(true),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  try {
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption) return;

    if (focusedOption.name === 'role') {
      const roles = await AppDataSource.manager.find(SelfRoles, {
        where: { RoleName: ILike(`%${focusedOption.value}%`) },
        take: 25,
      });

      return await interaction.respond(
        roles.map(role => ({
          name: role.Description ? `${role.RoleName} - ${role.Description}` : role.RoleName,
          value: role.RoleId,
        })),
      );
    }
  }
  catch (error) {
    console.error('Error in add autocomplete:', error);
  }
}

export async function execute(interaction: ChatInputCommandInteraction) {
  const roleId = interaction.options.getString('role', true);
  const member = interaction.member as GuildMember;

  if (!interaction.guild) {
    await interaction.reply({
      content: 'This command can only be used in a server.',
      ephemeral: true,
    });
    return;
  }

  // Check if this role is self-assignable
  const selfRole = await AppDataSource.manager.findOne(SelfRoles, {
    where: { RoleId: roleId },
  });

  if (!selfRole) {
    await interaction.reply({ content: 'That role is not self-assignable.', ephemeral: true });
    return;
  }

  // Check if user already has the role
  if (member.roles.cache.has(roleId)) {
    await interaction.reply({
      content: `You already have the **${selfRole.RoleName}** role.`,
      ephemeral: true,
    });
    return;
  }

  try {
    await member.roles.add(roleId);
    await interaction.reply({
      content: `✅ Added **${selfRole.RoleName}** to your roles.`,
      ephemeral: true,
    });
  }
  catch (error) {
    console.error('Error adding role:', error);
    await interaction.reply({
      content: 'Failed to add role. The bot may not have permission.',
      ephemeral: true,
    });
  }
}
