import {
  AutocompleteInteraction,
  Client,
  Collection,
  CommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute?(interaction: CommandInteraction): Promise<void>;
  autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
  handleModal?(interaction: ModalSubmitInteraction): Promise<void>;
}

export class TSClient extends Client {
  commands = new Collection<string, Command>();
}
