/* eslint-disable @typescript-eslint/no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import App from '../../src/app/app';

chai.use(chaiHttp);
const appUrl = 'http://localhost:3000';
const application = new App();

describe('Server Health Check', () => {
  before(async () => {
    await application.start().catch((error) => {
      console.error('📌 Could not start the application', error);
    });
  });

  after(async () => {
    await application.stop().catch((error) => {
      console.error('📌 Could not stop the application', error);
    });
  });
  it('should return status 200', async () => {
    const response = await chai.request(appUrl).get('/');
    expect(response).to.have.status(200);
  });
});
