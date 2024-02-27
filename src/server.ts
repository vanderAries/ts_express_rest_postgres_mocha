import App from './app/app';

const application = new App();
application.start().catch((error) => {
  console.error('📌 Could not start the application', error);
});
