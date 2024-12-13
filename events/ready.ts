// Assuming discord.js is properly typed, otherwise you might need to install types via npm i @types/discord.js
import { Events } from 'discord.js';
import { TSClient } from '../types';
import { checkForPromotions } from './check_for_promotions.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: TSClient) {
  if (client.user) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    checkForPromotions().catch(console.error);

    setInterval(
      () => {
        checkForPromotions().catch(console.error);
      },
      24 * 60 * 60 * 1000,
    );
    // 24 hours in milliseconds
  }
  else {
    console.log('Client is not logged in yet');
  }
}
