import express, { type Application } from 'express';
import { type Server } from 'http';
import {
  MikroORM,
  RequestContext,
  type Connection,
  type IDatabaseDriver,
} from '@mikro-orm/core';
import ormConfig from './mikro-orm.config';
import tasks from './api/tasks/tasks.routes';

export default class App {
  private host!: Application;

  private orm!: MikroORM<IDatabaseDriver<Connection>>;

  private server!: Server;

  protected connectDatabase = async (): Promise<void> => {
    try {
      this.orm = await MikroORM.init(ormConfig);
    } catch (error) {
      console.error('📌 Could not connect to the database', error);
      throw error;
    }
  };

  protected generateSchema = async (): Promise<void> => {
    const generator = this.orm.schema;
    await generator.updateSchema();
  };

  protected initExpress = (): void => {
    try {
      this.host = express();

      this.host.use(express.json());
      this.host.use((_req, _res, next) => {
        RequestContext.create(this.orm.em, next);
      });

      this.host.get('/', (_req, res) => {
        res.sendStatus(200);
      });

      this.host.use('/tasks', tasks);
    } catch (error) {
      console.error('📌 Could not init Express', error);
      throw error;
    }
  };

  protected launchServer = (): void => {
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

  public start = async (): Promise<void> => {
    try {
      await this.connectDatabase();
      await this.generateSchema();
      this.initExpress();
      this.launchServer();
    } catch (error) {
      console.error('📌 Could not start the application', error);
      throw error;
    }
  };

  public stop = async (): Promise<void> => {
    try {
      await this.orm.close();
      this.server.close();
    } catch (error) {
      console.error('📌 Could not stop the application', error);
      throw error;
    }
  };
}
