import { SlashCommandBuilder } from 'discord.js';
import _ from 'lodash';
import { AppDataSource, initializeDataSource } from '../../app_data.js';
import { ClassDefinitions } from '../../entities/ClassDefinitions.js';
await initializeDataSource();
// export async function findCensusByName(name: string) {
// 	const censusRecord = await AppDataSource.manager.findOneBy(Census, { Name: name });
// 	return censusRecord;
// }
async function getClassNamesWithLevelAttainedOne() {
    const records = await AppDataSource.manager
        .createQueryBuilder(ClassDefinitions, 'classDefinitions')
        .select('classDefinitions.CharacterClass')
        .where('classDefinitions.LevelAttained = :level', { level: '1' })
        .distinct(true)
        .orderBy('classDefinitions.CharacterClass')
        .getRawMany();
    const classNames = records.map(record => record.classDefinitions_character_class);
    return classNames;
}
export const data = new SlashCommandBuilder()
    .setName('classes')
    .setDescription('Discovers toons related to a name.')
    .addStringOption(option => option.setName('class')
    .setDescription('Phrase to search for')
    .setRequired(true)
    .setAutocomplete(true));
export async function autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    if (focusedOption.name === 'class') {
        try {
            const choices = await getClassNamesWithLevelAttainedOne();
            const filtered = choices.filter(choice => _.lowerCase(choice).startsWith(_.lowerCase(focusedOption.value)));
            await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
        }
        catch (error) {
            console.error('Error in autocomplete:', error);
        }
    }
}
export async function execute(interaction) {
    const { options } = interaction;
    const query = options.get('class')?.value;
    await interaction.reply(`https://discordjs.guide/search?q=${encodeURIComponent(query)}`);
}
