import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();
export const appDataSource = new DataSource({
    type: 'postgres',
    username: process.env.PGUSER,
    password: process.env.PGPASS,
    host: process.env.PGHOST,
    port: 5432,
    database: process.env.PGDATA,
});
const main = async () => {
    console.time('main');
    await appDataSource.initialize();
};
main().catch(err => {
    console.error(err);
    process.exit(1);
});
