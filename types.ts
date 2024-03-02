import { AutocompleteInteraction, Client, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute?(interaction: CommandInteraction): Promise<void>;
  autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
}

export class TSClient extends Client {
  commands = new Collection<string, Command>();
}
