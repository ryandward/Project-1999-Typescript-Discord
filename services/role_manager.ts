import { Guild, Role } from 'discord.js';
import { client } from '../client.js';

/**
 * Service for managing Discord guild roles programmatically.
 *
 * Wraps the discord.js guild/role API behind a simple interface used by
 * census functions and promotion logic to assign roles to members.
 */
export class DiscordRoleManager {
  /**
   * Fetches a guild by ID from the Discord API.
   * @param guildId - Discord guild snowflake ID.
   */
  private async getGuild(guildId: string): Promise<Guild> {
    return client.guilds.fetch(guildId);
  }

  /**
   * Finds a role by name within a guild's role cache.
   * @param guild - The guild to search.
   * @param roleName - Exact role name to find.
   * @throws If the role doesn't exist.
   */
  private async getRole(guild: Guild, roleName: string): Promise<Role> {
    const role = guild.roles.cache.find(r => r.name === roleName);
    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }
    return role;
  }

  /**
   * Adds a named role to a guild member.
   * @param guildId - Discord guild snowflake ID.
   * @param userId - Discord user snowflake ID.
   * @param roleName - Exact name of the role to add.
   */
  public async addRoleToUser(guildId: string, userId: string, roleName: string): Promise<void> {
    const guild = await this.getGuild(guildId);
    const role = await this.getRole(guild, roleName);
    const member = await guild.members.fetch(userId);
    await member.roles.add(role);
  }
}
