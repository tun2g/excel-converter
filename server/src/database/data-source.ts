// Must be imported first to load .env file for process.env
import * as process from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config()

const NODE_ENV = process.env.NODE_ENV;

dotenv.config({
  path: NODE_ENV === 'prod' ? '.env.prod' : `.env.${NODE_ENV}`,
});

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  autoLoadEntities: true,
  schema: 'public',
  dropSchema: false,
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/lib/configs/database/migrations',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);