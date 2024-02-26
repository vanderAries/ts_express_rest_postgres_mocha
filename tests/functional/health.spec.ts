/* eslint-disable @typescript-eslint/no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { type Server } from 'http';
import server from '../../src/server';

chai.use(chaiHttp);

let serverInstance: Server;
before(async () => {
  serverInstance = await server;
});

describe('Server Health Check', () => {
  it('should return status 200', async () => {
    const response = await chai.request(serverInstance).get('/');
    expect(response).to.have.status(200);
  });
});
