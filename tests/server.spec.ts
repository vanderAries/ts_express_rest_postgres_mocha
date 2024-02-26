/* eslint-disable @typescript-eslint/no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

chai.use(chaiHttp);

describe('Server Health Check', () => {
  it('should return Hello World!', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.text).to.equal('Hello World!');
        done();
      });
  });
});

describe('Tasks API', () => {
  describe('POST /tasks', () => {
    it('should return new task', (done) => {
      chai
        .request(server)
        .post('/tasks')
        .send({ name: 'Test', description: 'Test' })
        .end((err, res) => {
          chai.expect(err).to.be.null;
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.have.property('id');
          chai.expect(res.body).to.have.property('name');
          chai.expect(res.body).to.have.property('description');
          chai.expect(res.body).to.have.property('status');
          chai.expect(res.body).to.have.property('status');
          done();
        });
    });
  });
});
