import { AppDataSource, initializeDataSource } from './app_data.js';
import { ClassDefinitions } from './entities/ClassDefinitions.js';

export async function getClassNamesWithLevelAttainedOne() {
  const records = await AppDataSource.manager
    .createQueryBuilder(ClassDefinitions, 'classDefinitions')
    .select('classDefinitions.CharacterClass')
    .where('classDefinitions.LevelAttained = :level', { level: '1' })
    .distinct(true)
    .orderBy('classDefinitions.CharacterClass')
    .getRawMany();

  const classNames = records.map(
    (record) => record.classDefinitions_character_class,
  );
  return classNames;
}
// Extract the CharacterClass names from the records

// try {
// 	await AppDataSource.initialize();
// 	console.log('Data Source has been initialized!');
// 	const censusRecord = await findCensusByName('Rahmani');
// 	console.log(censusRecord);
// }
// catch (error) {
// 	console.error('Error during Data Source initialization:', error);
// 	process.exit(1);
// }

console.log('Running queries...');

initializeDataSource().then(() => {
  getClassNamesWithLevelAttainedOne().then(console.log);
});
