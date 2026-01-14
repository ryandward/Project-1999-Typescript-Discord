import { AutocompleteInteraction, ChannelType, SlashCommandBuilder, TextChannel } from 'discord.js';
import 'dotenv/config';
import { FindManyOptions, FindOneOptions, ILike, LessThanOrEqual } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { client } from '../../client.js';
import { ActiveToons } from '../../entities/ActiveToons.js';
import { Census } from '../../entities/Census.js';
import { ClassDefinitions } from '../../entities/ClassDefinitions.js';
import { Dkp } from '../../entities/Dkp.js';
import { DiscordRoleManager } from '../../services/role_manager.js';

export async function userMustExist(DiscordId: string) {
  const user = await AppDataSource.manager.findOne(Dkp, { where: { DiscordId } });
  if (!user) {
    throw new Error(
      `:x: <@${DiscordId}> is not in the DKP database. Make sure to declare a main before declaring alts or bots.`,
    );
  }
  return user;
}

export async function userMustNotExist(DiscordId: string) {
  const user = await AppDataSource.manager.findOne(Dkp, { where: { DiscordId } });
  if (user) throw new Error(`:x: <@${DiscordId}> already exists.`);
  return user;
}

export async function levelMustBeValid(Level: number) {
  if (Level < 1 || Level > 60) throw new Error(':x: Level must be between 1 and 60.');
  return Level;
}

export async function classMustExist(CharacterClass: string) {
  const classEntered = await AppDataSource.manager.findOne(ClassDefinitions, {
    where: { CharacterClass },
  });
  if (!classEntered) throw new Error(`:x: ${CharacterClass} is not a valid class.`);
  return classEntered;
}

export async function toonMustExist(Name: string) {
  const toon = await AppDataSource.manager.findOne(Census, { where: { Name } });
  if (!toon) throw new Error(`:x: ${Name} does not exist, please complete all fields.`);
  return toon;
}

export async function toonMustNotExist(Name: string) {
  const toon = await AppDataSource.manager.findOne(Census, { where: { Name } });
  if (toon) throw new Error(`:x: ${Name} already exists.`);
  return toon;
}

export async function declareData(status: string) {
  const classNames = await validCharacterClasses();

  return new SlashCommandBuilder()
    .setName(status)
    .setDescription(`Declare character as "${status}"`)
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('The name of the character')
        .setRequired(true)
        .setMaxLength(24),
    )
    .addNumberOption(option =>
      option
        .setName('level')
        .setDescription('The level of the character')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(60),
    )
    .addStringOption(option =>
      option
        .setName('class')
        .setDescription('The class of the character')
        .setRequired(true)
        .addChoices(...classNames),
    );
}

export async function declareAutocomplete(interaction: AutocompleteInteraction) {
  const focusedOption = interaction.options.getFocused(true);
  if (!focusedOption) return;

  if (focusedOption.name === 'class') {
    suggestCharacterClasses(focusedOption.value)
      .then(choices => {
        interaction.respond(
          choices.map(choice => ({ name: choice.ClassName, value: choice.CharacterClass })),
        );
      })
      .catch(error => {
        console.error('Error in autocomplete:', error);
      });
  }
}

export async function suggestCharacterClasses(partialName: string, level?: number) {
  const options: FindManyOptions = {
    where: {
      ClassName: ILike(`%${partialName}%`),
      LevelAttained: LessThanOrEqual(level ? level : 1),
    },
    order: { LevelAttained: 'DESC' },
    take: 20,
  };

  return await AppDataSource.manager.find(ClassDefinitions, options);
}

export async function validCharacterClasses() {
  const records = await AppDataSource.manager
    .createQueryBuilder(ClassDefinitions, 'c')
    .select('c.CharacterClass')
    .where('c.CharacterClass = c.ClassName')
    .orderBy('c.CharacterClass')
    .getMany();

  const classNames = records.map(record => ({
    name: record.CharacterClass,
    value: record.CharacterClass,
  }));

  return classNames;
}

export async function declare(
  DiscordId: string,
  Status: string,
  Name: string,
  Level: number,
  CharacterClass: string,
): Promise<string> {
  const newToon = new Census();
  newToon.DiscordId = DiscordId;
  newToon.Status = Status;
  newToon.Name = Name;
  newToon.Level = Level;
  newToon.CharacterClass = CharacterClass;
  newToon.Time = new Date();

  return AppDataSource.manager
    .save(newToon)
    .then(() => {
      return `:white_check_mark: <@${DiscordId}>'s \`${Name}\` is now a level \`${Level}\` \`${Status}\` \`${CharacterClass}\`!`;
    })
    .catch(error => {
      return `Error declaring ${Name}: ${error}`;
    });
}

export async function insertUser(DiscordId: string) {
  const user = await AppDataSource.manager.findOne(Dkp, { where: { DiscordId } });
  const roleManager = new DiscordRoleManager();

  if (!user) {
    const newUser = new Dkp();
    newUser.DiscordId = DiscordId;
    newUser.EarnedDkp = 5;
    newUser.SpentDkp = 0;
    await AppDataSource.manager.save(newUser);

    // Get the guild and the member
    const guildId = process.env.GUILD_ID;

    if (!guildId) {
      throw new Error('GUILD_ID is not set in the environment');
    }

    await roleManager.addRoleToUser(guildId, DiscordId, 'Probationary Member');

    // send a message to channel # 884164383498965042
    client.channels.fetch('884164383498965042').then(channel => {
      if (channel && channel.type === ChannelType.GuildText) {
        (channel as TextChannel).send(
          `<@${DiscordId}> is now a Probationary Member!` +
            '\n' +
            'Use `/toons` `user` to get more info or to promote.',
        );
      }
      else {
        console.error('Channel not found or not a text-based channel');
      }
    });

    return `:moneybag: <@${DiscordId}> has been added to the DKP database with 5 DKP and is now a Probationary Member!`;
  }
  return false;
}

export async function suggestActiveToons(partialName: string) {
  const options: FindManyOptions = {
    where: { Name: ILike(`%${partialName}%`) },
    take: 20,
  };

  return await AppDataSource.manager.find(ActiveToons, options);
}

export async function returnAllActiveToonsByName(partialName: string) {
  const targetToon: FindOneOptions = {
    where: {
      Name: ILike(`%${partialName}%`),
    },
  };
  const toon = await AppDataSource.manager.findOne(ActiveToons, targetToon);
  if (!toon) {
    return [];
  }
  return await returnAllActiveToonsByDiscordId(toon.DiscordId);
}

export async function returnAllActiveToonsByDiscordId(userId: string) {
  const otherToons: FindManyOptions = {
    where: {
      DiscordId: userId,
    },
  };
  return await AppDataSource.manager.find(ActiveToons, otherToons);
}

export function formatField(field: string[]): string {
  // const monoField = field.map(item => `\`${item}\``);
  // return monoField.join('\n');
  // return '```' + '\n' + field.join('\n') + '\n' + '```';
  return field.join('\n');
}
