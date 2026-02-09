/**
 * `ClientReady` event handler — fires once after the bot successfully logs in.
 *
 * On startup it immediately runs `checkForPromotions` and then
 * schedules it to repeat every 24 hours.
 *
 * @module
 */
import { Events } from 'discord.js';
import { TSClient } from '../types';
import { checkForPromotions } from './check_for_promotions.js';

/** Discord event name this module handles. */
export const name = Events.ClientReady;
/** When `true`, the event listener fires only once. */
export const once = true;

/**
 * Logs the bot's identity and starts the daily promotion-check interval.
 * @param client - The fully initialised `TSClient`.
 */
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
