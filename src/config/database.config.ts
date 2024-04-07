import 'dotenv/config';

import { join } from 'path';
import { DataSource } from 'typeorm';

const type = 'postgres';
const host = process.env.POSTGRES_HOST;
const port = +process.env.POSTGRES_PORT;
const database = process.env.POSTGRES_DATABASE;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

export const databaseURL = `${type}://${username}:${password}@${host}:${port}`;

export const dataSource = new DataSource({
  type,

  url: [databaseURL, database].join('/'),
  // ssl: { rejectUnauthorized: false },

  entities: [join(__dirname + '/../**') + '/*.entity.{js,ts}'],
  migrations: ['dist/migrations/*.{js,ts}'],
  logging: true,

  // synchronize: process.env.NODE_ENV === 'development',
});
