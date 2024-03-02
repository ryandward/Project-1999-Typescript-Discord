import { EmbedBuilder, SlashCommandBuilder, } from 'discord.js';
import { ILike } from 'typeorm';
import { AppDataSource } from '../../app_data.js';
import { ActiveToons } from '../../entities/ActiveToons.js';
import { ClassDefinitions } from '../../entities/ClassDefinitions.js';
async function suggestCharacterClasses(partialName) {
    const options = {
        where: {
            ClassName: ILike(`%${partialName}%`),
        },
        order: { LevelAttained: 'DESC' },
        take: 20,
    };
    return await AppDataSource.manager.find(ClassDefinitions, options);
}
async function suggestActiveToons(partialName) {
    const options = {
        where: { Name: ILike(`%${partialName}%`) },
        take: 20,
    };
    return await AppDataSource.manager.find(ActiveToons, options);
}
async function returnAllActiveToonsByName(partialName) {
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
async function returnAllActiveToonsByDiscordId(userId) {
    const otherToons = {
        where: {
            DiscordId: userId,
        },
    };
    return await AppDataSource.manager.find(ActiveToons, otherToons);
}
function formatField(field) {
    return '```\n' + field.join('\n') + '\n```';
}
export const data = new SlashCommandBuilder()
    .setName('toons')
    .setDescription('Discovers toons related to a name or a user.')
    .addUserOption(option => option.setName('user').setDescription('User to search for').setRequired(false))
    .addStringOption(option => option.setName('name').setDescription('Name of the toon').setAutocomplete(true));
export async function autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    if (!focusedOption)
        return;
    if (focusedOption.name === 'class') {
        try {
            const choices = await suggestCharacterClasses(focusedOption.value);
            await interaction.respond(choices.map(choice => ({ name: choice.CharacterClass, value: choice.ClassName })));
        }
        catch (error) {
            console.error('Error in autocomplete:', error);
        }
    }
    else if (focusedOption.name === 'name') {
        try {
            const choices = await suggestActiveToons(focusedOption.value);
            await interaction.respond(choices.map(choice => ({ name: choice.Name, value: choice.Name })));
        }
        catch (error) {
            console.error('Error in autocomplete:', error);
        }
    }
}
export async function execute(interaction) {
    const { options } = interaction;
    let discordId;
    let toonsData;
    if (!options.get('user') && !options.get('name')) {
        // get the user's toons
        discordId = interaction.user.id;
        toonsData = await returnAllActiveToonsByDiscordId(discordId);
    }
    else if (options.get('user')) {
        discordId = options.get('user')?.value;
        toonsData = await returnAllActiveToonsByDiscordId(discordId);
    }
    else if (options.get('name')) {
        toonsData = await returnAllActiveToonsByName(options.get('name')?.value);
        discordId = toonsData[0].DiscordId;
    }
    else {
        // Handle the case where no toons were found, perhaps set discordId to a default value or notify the user
        await interaction.reply({
            content: 'No toons found for the provided name.',
            ephemeral: true,
        });
        return;
    }
    const statusOrder = ['Main', 'Alt', 'Bot', 'Dropped'];
    const embed = new EmbedBuilder()
        .setTitle(':book: Record of Toons in the Ex Astra Census')
        .setDescription(`<@${discordId}>\n<t:${Math.floor(Date.now() / 1000)}:R>`)
        .setColor('Green');
    const embedBuilder = statusOrder.reduce((currentEmbed, status) => {
        const toonsWithStatus = toonsData.filter(toon => toon.Status === status);
        // Skip this status if there are no toons with this status
        if (toonsWithStatus.length === 0) {
            return currentEmbed;
        }
        const sortedToons = toonsWithStatus.sort((a, b) => b.Level - a.Level);
        const sortedToonNames = formatField(sortedToons.map(toon => toon.Name));
        const sortedToonClasses = formatField(sortedToons.map(toon => toon.CharacterClass));
        const sortedToonLevels = formatField(sortedToons.map(toon => toon.Level.toString()));
        return currentEmbed.addFields({
            name: status,
            value: `${toonsWithStatus.length} character(s) declared as ${status.toLowerCase()}(s)`,
            inline: false,
        }, { name: ':bust_in_silhouette: Name', value: sortedToonNames, inline: true }, { name: ':crossed_swords: Class', value: sortedToonClasses, inline: true }, { name: ':arrow_double_up: Level', value: sortedToonLevels, inline: true });
    }, embed);
    await interaction.reply({ embeds: [embedBuilder] });
}
