import {
  ChatInputCommandInteraction,
  ColorResolvable,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import { AppDataSource } from '../../app_data.js';
import { SelfRoles } from '../../entities/SelfRoles.js';

export const data = new SlashCommandBuilder()
  .setName('create_role')
  .setDescription('Manage self-assignable roles')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
  .addSubcommand(subcommand =>
    subcommand
      .setName('add')
      .setDescription('Create a new self-assignable role')
      .addStringOption(option =>
        option.setName('name').setDescription('Name for the new role').setRequired(true),
      )
      .addStringOption(option =>
        option.setName('description').setDescription('Description for this role').setRequired(false),
      )
      .addStringOption(option =>
        option
          .setName('color')
          .setDescription('Color for the role')
          .setRequired(false)
          .addChoices(
            { name: '🔴 Red', value: '#E74C3C' },
            { name: '🟠 Orange', value: '#E67E22' },
            { name: '🟡 Yellow', value: '#F1C40F' },
            { name: '🟢 Green', value: '#2ECC71' },
            { name: '🔵 Blue', value: '#3498DB' },
            { name: '🟣 Purple', value: '#9B59B6' },
            { name: '💗 Pink', value: '#E91E63' },
            { name: '🩵 Teal', value: '#1ABC9C' },
            { name: '⚪ White', value: '#FFFFFF' },
            { name: '⬛ Dark Grey', value: '#607D8B' },
          ),
      ),
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('remove')
      .setDescription('Delete a self-assignable role')
      .addRoleOption(option =>
        option.setName('role').setDescription('The role to delete').setRequired(true),
      ),
  )
  .addSubcommand(subcommand =>
    subcommand.setName('list').setDescription('List all self-assignable roles'),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();

  if (!interaction.guild) {
    await interaction.reply({
      content: 'This command can only be used in a server.',
      ephemeral: true,
    });
    return;
  }

  if (subcommand === 'add') {
    const name = interaction.options.getString('name', true);
    const description = interaction.options.getString('description');
    const colorInput = interaction.options.getString('color');

    // Check if role with this name already exists
    const existingRole = interaction.guild.roles.cache.find(
      r => r.name.toLowerCase() === name.toLowerCase(),
    );
    if (existingRole) {
      await interaction.reply({
        content: `A role named **${name}** already exists.`,
        ephemeral: true,
      });
      return;
    }

    try {
      // Create the Discord role with no permissions, at the bottom
      const role = await interaction.guild.roles.create({
        name: name,
        color: (colorInput as ColorResolvable) || undefined,
        permissions: [],
        reason: `Self-assignable role created by ${interaction.user.tag}`,
      });

      // Save to database
      const selfRole = new SelfRoles();
      selfRole.RoleId = role.id;
      selfRole.RoleName = role.name;
      selfRole.Description = description;

      await AppDataSource.manager.save(selfRole);

      const embed = new EmbedBuilder()
        .setTitle('✅ Self-Assignable Role Created')
        .setColor(role.color || 'Green')
        .setDescription(`Created role ${role}\n\nUsers can now use \`/add\` to get this role.`)
        .addFields({ name: 'Created by', value: `${interaction.user}`, inline: true });
      if (description) {
        embed.addFields({ name: 'Description', value: description, inline: true });
      }

      await interaction.reply({ embeds: [embed] });
    }
    catch (error) {
      console.error('Error creating role:', error);
      await interaction.reply({
        content: 'Failed to create role. The bot may not have permission.',
        ephemeral: true,
      });
    }
  }
  else if (subcommand === 'remove') {
    const role = interaction.options.getRole('role', true);

    // Check if it's a self-assignable role
    const selfRole = await AppDataSource.manager.findOne(SelfRoles, {
      where: { RoleId: role.id },
    });

    if (!selfRole) {
      await interaction.reply({
        content: `**${role.name}** is not a self-assignable role.`,
        ephemeral: true,
      });
      return;
    }

    try {
      // Delete from database
      await AppDataSource.manager.delete(SelfRoles, { RoleId: role.id });

      // Delete the Discord role
      const guildRole = interaction.guild.roles.cache.get(role.id);
      if (guildRole) {
        await guildRole.delete(`Self-assignable role deleted by ${interaction.user.tag}`);
      }

      await interaction.reply({
        content: `✅ Deleted self-assignable role **${role.name}**.`,
      });
    }
    catch (error) {
      console.error('Error deleting role:', error);
      await interaction.reply({
        content: 'Failed to delete role. The bot may not have permission.',
        ephemeral: true,
      });
    }
  }
  else if (subcommand === 'list') {
    const roles = await AppDataSource.manager.find(SelfRoles);

    if (roles.length === 0) {
      await interaction.reply({ content: 'No self-assignable roles configured.', ephemeral: true });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle('Self-Assignable Roles')
      .setColor('Blue')
      .setDescription(
        roles
          .map(r => {
            const desc = r.Description ? ` - ${r.Description}` : '';
            return `• <@&${r.RoleId}>${desc}`;
          })
          .join('\n'),
      );

    await interaction.reply({ embeds: [embed] });
  }
}
