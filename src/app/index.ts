import { MikroORM } from '@mikro-orm/postgresql';
import express, { type Application } from 'express';
// import users from './users/routes';
import tasks from './tasks/routes';

export const init = (async () => {
  const orm = await MikroORM.init({
    entities: ['./dist/src/entities'], // path to your JS entities (dist), relative to `baseDir`
    dbName: 'postgres',
    password: 'password',
  });
  console.log(orm.em); // access EntityManager via `em` property
})();

// Boot express
const app: Application = express();

app.use(express.json());

// app.use('/users', users);
app.use('/tasks', tasks);

export default app;
