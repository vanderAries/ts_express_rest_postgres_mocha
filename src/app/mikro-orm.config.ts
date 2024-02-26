import { type Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: Options = {
  driver: PostgreSqlDriver,
  entities: ['./dist/src/app/**/*.entity.js'],
  entitiesTs: ['./src/app/**/*.entity.ts'],
  port: 8000,
  dbName: 'postgres',
  password: 'password',
  debug: true,
};

export default config;
