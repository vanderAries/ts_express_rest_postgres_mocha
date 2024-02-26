/* eslint-disable @typescript-eslint/no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

chai.use(chaiHttp);

describe('Server', () => {
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
