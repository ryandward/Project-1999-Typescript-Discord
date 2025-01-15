import { ChannelType, TextChannel } from 'discord.js';
import { Between } from 'typeorm';
import { AppDataSource } from '../app_data.js';
import { client } from '../client.js';
import { Dkp } from '../entities/Dkp.js';
// import { DiscordRoleManager } from '../services/role_manager.js';

export async function checkForPromotions() {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

  const users = await AppDataSource.manager.find(Dkp, {
    where: {
      DateJoined: Between(fourWeeksAgo, twoWeeksAgo),
    },
  });

  // const roleManager = new DiscordRoleManager();
  const guildId = process.env.GUILD_ID;

  if (!guildId) {
    throw new Error('GUILD_ID is not set in the environment');
  }

  for (const user of users) {
    const timeSinceJoined = new Date().getTime() - user.DateJoined.getTime();
    const daysSinceJoined = Math.floor(timeSinceJoined / (1000 * 60 * 60 * 24));
    const member = await client.guilds.cache.get(guildId)?.members.fetch(user.DiscordId);
    if (member?.roles.cache.some((role: { name: string }) => role.name === 'Probationary Member')) {
      client.channels.fetch('884164383498965042').then(channel => {
        if (channel && channel.type === ChannelType.GuildText) {
          (channel as TextChannel).send(
            `<@${user.DiscordId}> might need to be promoted, ${daysSinceJoined} days since joining.`,
          );
        }
        else {
          console.error('Channel not found or not a text-based channel');
        }
      });
    }
  }
}
