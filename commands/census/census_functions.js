import { SlashCommandBuilder } from 'discord.js';
import { ILike, LessThanOrEqual } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { ActiveToons } from '../../entities/ActiveToons.js';
import { Census } from '../../entities/Census.js';
import { ClassDefinitions } from '../../entities/ClassDefinitions.js';
import { Dkp } from '../../entities/Dkp.js';
export async function userMustExist(DiscordId) {
    const user = await AppDataSource.manager.findOne(Dkp, { where: { DiscordId } });
    if (!user) {
        throw new Error(`:x: <@${DiscordId}> is not in the DKP database. Make sure to declare a main before declaring alts or bots.`);
    }
    return user;
}
export async function userMustNotExist(DiscordId) {
    const user = await AppDataSource.manager.findOne(Dkp, { where: { DiscordId } });
    if (user)
        throw new Error(`:x: <@${DiscordId}> already exists.`);
    return user;
}
export async function levelMustBeValid(Level) {
    if (Level < 1 || Level > 60)
        throw new Error(':x: Level must be between 1 and 60.');
    return Level;
}
export async function classMustExist(CharacterClass) {
    const classEntered = await AppDataSource.manager.findOne(ClassDefinitions, {
        where: { CharacterClass },
    });
    if (!classEntered)
        throw new Error(`:x: ${CharacterClass} is not a valid class.`);
    return classEntered;
}
export async function toonMustExist(Name) {
    const toon = await AppDataSource.manager.findOne(Census, { where: { Name } });
    if (!toon)
        throw new Error(`:x: ${Name} does not exist, please complete all fields.`);
    return toon;
}
export async function toonMustNotExist(Name) {
    const toon = await AppDataSource.manager.findOne(Census, { where: { Name } });
    if (toon)
        throw new Error(`:x: ${Name} already exists.`);
    return toon;
}
export async function declareData(status) {
    const classNames = await validCharacterClasses();
    return new SlashCommandBuilder()
        .setName(status)
        .setDescription(`Declare character as "${status}"`)
        .addStringOption(option => option
        .setName('name')
        .setDescription('The name of the character')
        .setRequired(true)
        .setMaxLength(24))
        .addNumberOption(option => option
        .setName('level')
        .setDescription('The level of the character')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(60))
        .addStringOption(option => option
        .setName('class')
        .setDescription('The class of the character')
        .setRequired(true)
        .addChoices(...classNames));
}
export async function declareAutocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption)
        return;
    if (focusedOption.name === 'class') {
        suggestCharacterClasses(focusedOption.value)
            .then(choices => {
            interaction.respond(choices.map(choice => ({ name: choice.ClassName, value: choice.CharacterClass })));
        })
            .catch(error => {
            console.error('Error in autocomplete:', error);
        });
    }
}
export async function suggestCharacterClasses(partialName, level) {
    const options = {
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
export async function declare(DiscordId, Status, Name, Level, CharacterClass) {
    const newToon = new ActiveToons();
    newToon.DiscordId = DiscordId;
    newToon.Status = Status;
    newToon.Name = Name;
    newToon.Level = Level;
    newToon.CharacterClass = CharacterClass;
    return AppDataSource.manager
        .save(newToon)
        .then(() => {
        return `:white_check_mark: <@${DiscordId}>'s \`${Name}\` is now a level \`${Level}\` \`${Status}\` \`${CharacterClass}\`!`;
    })
        .catch(error => {
        return `Error declaring ${Name}: ${error}`;
    });
}
export async function insertUser(DiscordId) {
    const user = await AppDataSource.manager.findOne(Dkp, { where: { DiscordId } });
    if (!user) {
        const newUser = new Dkp();
        newUser.DiscordId = DiscordId;
        newUser.EarnedDkp = 5;
        newUser.SpentDkp = 0;
        await AppDataSource.manager.save(newUser);
        return `:moneybag: <@${DiscordId}> has been added to the DKP database with 5 DKP!`;
    }
    return false;
}
export async function suggestActiveToons(partialName) {
    const options = {
        where: { Name: ILike(`%${partialName}%`) },
        take: 20,
    };
    return await AppDataSource.manager.find(ActiveToons, options);
}
export async function returnAllActiveToonsByName(partialName) {
    const targetToon = {
        where: {
            Name: ILike(`%${partialName}%`),
        },
    };
    const userId = await AppDataSource.manager
        .findOne(ActiveToons, targetToon)
        .then(toon => toon.DiscordId);
    return await returnAllActiveToonsByDiscordId(userId);
}
export async function returnAllActiveToonsByDiscordId(userId) {
    const otherToons = {
        where: {
            DiscordId: userId,
        },
    };
    return await AppDataSource.manager.find(ActiveToons, otherToons);
}
export function formatField(field) {
    return '```\n' + field.join('\n') + '\n```';
}
