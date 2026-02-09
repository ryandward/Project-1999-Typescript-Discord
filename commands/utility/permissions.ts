/**
 * `/permissions` command — displays the Discord permission flags for a given user.
 *
 * Resolves the target user in the guild and lists all their permission
 * flags in an ephemeral embed.
 *
 * @module
 */
import {
  ChatInputCommandInteraction,
  CommandInteractionOptionResolver,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('permissions')
  .setDescription('Checks the permissions of a user.')
  .addUserOption(option =>
    option.setName('user').setDescription('The user to check permissions for').setRequired(true),
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const user = (interaction.options as CommandInteractionOptionResolver).getUser('user');
  const permissions = user
    ? interaction.guild?.members.resolve(user.id)?.permissions.toArray()
    : null;
  const embed = new EmbedBuilder()
    .setTitle('User Permissions')
    .setDescription(`Here are the permissions for user ${user?.username}:`)
    .setColor('Blue');

  if (permissions) {
    embed.addFields({
      name: 'Permissions',
      value: permissions.join('\n'),
      inline: false,
    });
  }
  else {
    embed.addFields({
      name: 'Permissions',
      value: 'No permissions found.',
      inline: false,
    });
  }

  await interaction.reply({
    embeds: [embed],
    flags: MessageFlags.Ephemeral,
  });
};
