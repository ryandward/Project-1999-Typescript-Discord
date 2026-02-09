/**
 * Central interaction router for the Discord gateway.
 *
 * Listens for `Events.InteractionCreate` and dispatches to the
 * appropriate handler based on interaction type:
 * - `CommandInteraction` → `command.execute()`
 * - `AutocompleteInteraction` → `command.autocomplete()`
 * - `ModalSubmitInteraction` → `command.handleModal()` (currently only `attendance_modal`)
 *
 * @module
 */
import {
  AutocompleteInteraction,
  CommandInteraction,
  Events,
  Interaction,
  ModalSubmitInteraction,
} from 'discord.js';
import { TSClient } from '../types';

/** Discord event name this module handles. */
export const name = Events.InteractionCreate;

/**
 * Routes an incoming interaction to the correct command handler.
 * @param interaction - The raw Discord interaction.
 */
export async function execute(interaction: Interaction) {
  if (interaction instanceof CommandInteraction) {
    // if (!interaction.isChatInputCommand()) return;
    const command = (interaction.client as TSClient).commands.get(interaction.commandName);

    if (!command || !command.execute) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      await command.execute(interaction);
    }
    catch (error) {
      console.error(error);
    }
  }
  else if (interaction instanceof AutocompleteInteraction) {
    // if (!interaction.isAutocomplete()) return;
    const command = (interaction.client as TSClient).commands.get(interaction.commandName);

    if (!command || !command.autocomplete) {
      console.error(`No autocomplete handler for ${interaction.commandName}`);
      return;
    }

    try {
      await command.autocomplete(interaction);
    }
    catch (error) {
      console.error(error);
    }
  }
  else if (interaction instanceof ModalSubmitInteraction) {
    // Handle modal submissions - customId format: "commandName_modal"
    const customId = interaction.customId;

    if (customId === 'attendance_modal') {
      const command = (interaction.client as TSClient).commands.get('attendance');
      if (command && command.handleModal) {
        try {
          await command.handleModal(interaction);
        }
        catch (error) {
          console.error('Error handling attendance modal:', error);
        }
      }
    }
  }
}
