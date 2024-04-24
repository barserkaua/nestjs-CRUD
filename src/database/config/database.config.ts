import 'dotenv/config';

import { join } from 'path';
import { DatabaseModeEnum } from '../../constants/database.enum';
import { DataSource } from 'typeorm';

const type = 'postgres';
const host = process.env.POSTGRES_HOST;
const port = +process.env.POSTGRES_PORT;
const database = process.env.POSTGRES_DATABASE;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

export const localDatabaseURL = `${type}://${username}:${password}@${host}:${port}`;

const databaseURL =
  process.env.MODE === DatabaseModeEnum.DEV
    ? [localDatabaseURL, database].join('/')
    : process.env.DB_URL;

export const dataSource = new DataSource({
  type,

  url: databaseURL,
  // ssl: { rejectUnauthorized: false },

  entities: [join(__dirname + '/../../**') + '/*.entity.{js,ts}'],
  migrations: ['dist/database/migrations/*.{js,ts}'],
  logging: false,

  // synchronize: process.env.NODE_ENV === 'development',
});
