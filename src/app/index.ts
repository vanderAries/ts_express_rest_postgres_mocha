import express, { type Application } from 'express';
import users from './users/routes';
import tasks from './tasks/routes';

// Boot express
const app: Application = express();

app.use(express.json());

app.use('/users', users);
app.use('/tasks', tasks);

export default app;
