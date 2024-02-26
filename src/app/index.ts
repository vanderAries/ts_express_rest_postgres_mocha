import { MikroORM } from '@mikro-orm/postgresql';
import express, { type Application } from 'express';
import tasks from './api/tasks/tasks.routes';

export const init = (async () => {
  const orm = await MikroORM.init({
    entities: ['./dist/src/app/**/*.entity.js'],
    entitiesTs: ['./src/app/**/*.entity.ts'],
    port: 8000,
    dbName: 'postgres',
    password: 'password',
  });
  console.log(orm.em);
})();

// Boot express
const app: Application = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.use('/tasks', tasks);

export default app;
