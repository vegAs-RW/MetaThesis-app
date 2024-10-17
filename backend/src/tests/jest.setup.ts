import {beforeAll, afterAll} from '@jest/globals';
import {db, pool} from '../infrastructure/data';
import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

beforeAll(async () => {
    try {
        console.log('Creating test database...');
        await db.execute(sql`CREATE SCHEMA IF NOT EXISTS test`);
        await db.execute(sql`SET search_path TO test`);
        await migrate(db, {migrationsFolder: 'src/infrastructure/data/drizzle', migrationsSchema: 'test'});
        console.log('Migration is done');
    } catch (error) {
        console.error('Error during beforeAll:', error);
    }
});

afterAll(async () => {
    try {
        console.log('Dropping test database...');
        await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
        await pool.end();
        console.log('Test database is dropped');
    } catch (error) {
        console.error('Error during afterAll:', error);
    }
});