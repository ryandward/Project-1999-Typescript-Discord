import {
  AutocompleteInteraction,
  ChannelType,
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('promote')
  .setDescription('Promotes a toon\'s owner to member.')
  .addStringOption(option =>
    option
      .setName('user')
      .setDescription('The Discord user to promote (type to search).')
      .setRequired(true)
      .setAutocomplete(true),
  );

export async function autocomplete(interaction: AutocompleteInteraction) {
  try {
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption) return;
    if (focusedOption.name === 'user') {
      const guild = interaction.guild;
      if (!guild) return;
      const search = (focusedOption.value as string).toLowerCase();
      const probationaryRole = guild.roles.cache.find(r => r.name === 'Probationary Member');
      if (!probationaryRole) return;
      const members = await guild.members.fetch();
      const filtered = members.filter(
        m =>
          m.roles.cache.has(probationaryRole.id) &&
          (m.displayName.toLowerCase().includes(search) ||
            m.user.username.toLowerCase().includes(search)),
      );

      const results = filtered.first(25).map(m => ({
        name: `@${m.displayName}`,
        value: m.id,
      }));

      await interaction.respond(results);
    }
  }
  catch (error) {
    console.error('Error in promote autocomplete:', error);
  }
}

export async function execute(interaction: ChatInputCommandInteraction) {
  try {
    const userId = interaction.options.getString('user', true);
    const guild = interaction.guild;
    if (!guild) throw new Error('Guild not found.');
    const member = await guild.members.fetch(userId);
    const probationaryRole = guild.roles.cache.find(r => r.name === 'Probationary Member');
    const memberRole = guild.roles.cache.find(r => r.name === 'Member');
    if (!probationaryRole || !memberRole) throw new Error('Roles not found.');
    if (!member.roles.cache.has(probationaryRole.id)) {
      return interaction.reply({
        content: `${member.displayName} does not have the Probationary Member role.`,
        flags: MessageFlags.Ephemeral,
      });
    }
    await member.roles.remove(probationaryRole);
    await member.roles.add(memberRole);
    await interaction.reply(`${member.displayName} has been promoted to full member.`);
    // Send congrats message to census chat
    const channel = guild.channels.cache.get('851549677815070751');
    if (channel && channel.type === ChannelType.GuildText) {
      (channel as TextChannel).send(
        `<@&870669705646587924> Send your congrats to <@${userId}>, the newest full member of Ex Astra!`,
      );
    }
  }
  catch (error) {
    if (error instanceof Error) {
      return interaction.reply({
        content: `An error occurred while promoting the user. Error message: ${error.message}`,
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}
