import { type Server } from 'http';
import App from './app';

const application = new App();

async function startApplication(): Promise<Server> {
  await application.connect();
  application.init();
  application.startServer();
  return application.server;
}

const server = startApplication();

export default server;
