import express, { type Application } from 'express';
import { type Server } from 'http';
import { MikroORM, type Connection, type IDatabaseDriver } from '@mikro-orm/core';
import ormConfig from './mikro-orm.config';
import tasks from './api/tasks/tasks.routes';

export default class App {
  public host!: Application;

  public orm!: MikroORM<IDatabaseDriver<Connection>>;

  public server!: Server;

  public connect = async (): Promise<void> => {
    try {
      this.orm = await MikroORM.init(ormConfig);
    } catch (error) {
      console.error('📌 Could not connect to the database', error);
      throw error;
    }
  };

  public init = (): void => {
    try {
      this.host = express();

      this.host.use(express.json());

      this.host.get('/', (_, res) => {
        res.sendStatus(200);
      });

      this.host.use('/tasks', tasks);
    } catch (error) {
      console.error('📌 Could not init Express', error);
      throw error;
    }
  };

  public startServer = (): void => {
    try {
      const port = process.env.PORT ?? 3000;
      this.server = this.host.listen(port, () => {
        console.log(`Server is running on http://localhost:${port} 🚀`);
      });
    } catch (error) {
      console.error('📌 Could not start server', error);
      throw error;
    }
  };
}
