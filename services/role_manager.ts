import { Guild, Role } from 'discord.js';
import { client } from '../client.js';

export class DiscordRoleManager {
  private async getGuild(guildId: string): Promise<Guild> {
    return client.guilds.fetch(guildId);
  }

  private async getRole(guild: Guild, roleName: string): Promise<Role> {
    const role = guild.roles.cache.find(r => r.name === roleName);
    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }
    return role;
  }

  public async addRoleToUser(guildId: string, userId: string, roleName: string): Promise<void> {
    const guild = await this.getGuild(guildId);
    const role = await this.getRole(guild, roleName);
    const member = await guild.members.fetch(userId);
    await member.roles.add(role);
  }
}
