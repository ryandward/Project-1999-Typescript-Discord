import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();
export const AppDataSource = new DataSource({
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
// Export an async function to initialize the data source
export async function initializeDataSource() {
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');
    }
    catch (error) {
        console.error('Error during Data Source initialization:', error);
        process.exit(1);
    }
}
