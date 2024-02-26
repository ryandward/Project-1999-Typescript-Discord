import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Census } from './entities/Census.js';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASS,
  database: process.env.PGDATA,
  synchronize: false,
  logging: false,
  entities: ['./entities/*.js'],
  subscribers: [],
  migrations: [],
});

async function findCensusByName(name: string) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Data Source has been initialized!');
    }

    // Adjusted to use dataSource.manager.findOneBy
    const censusRecord = await AppDataSource.manager.findOneBy(Census, { Name: name });
    console.log(censusRecord);
  }
  catch (error) {
    console.error('Error:', error);
  }
}

async function runQueries() {
  await findCensusByName('Rahmani');
  await findCensusByName('Meguvin');
  await findCensusByName('Sambal');
  // Consider destroying the data source only if you're sure the app is shutting down or no longer needs database connections
  // await AppDataSource.destroy();
}

runQueries();
