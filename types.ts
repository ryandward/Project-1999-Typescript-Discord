import {
  AutocompleteInteraction,
  Client,
  Collection,
  CommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
} from 'discord.js';

/**
 * Contract that every slash command module must satisfy.
 *
 * Each command file in `commands/` exports an object conforming to this
 * interface. The bot loader in `index.ts` registers commands that have
 * at least `data` and `execute`.
 */
export interface Command {
  /** Slash command definition built with the discord.js `SlashCommandBuilder`. */
  data: SlashCommandBuilder;
  /** Handler invoked when a user runs the slash command. */
  execute?(interaction: CommandInteraction): Promise<void>;
  /** Handler invoked when Discord requests autocomplete suggestions for this command. */
  autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
  /** Handler invoked when a modal submitted by this command is received. */
  handleModal?(interaction: ModalSubmitInteraction): Promise<void>;
}

/**
 * Extended Discord.js `Client` that carries a {@link Command} collection.
 *
 * Instantiated once in `client.ts` and shared across the entire
 * application as a singleton.
 */
export class TSClient extends Client {
  /** Map of command name → {@link Command} object, populated at startup. */
  commands = new Collection<string, Command>();
}
