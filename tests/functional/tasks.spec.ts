/* eslint-disable @typescript-eslint/no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import App from '../../src/app/app';

chai.use(chaiHttp);
const appUrl = 'http://localhost:3000';
const application = new App();

describe('Tasks API', () => {
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
  describe('Create new Task | POST /tasks', () => {
    it('should return new task', async () => {
      const newTask = {
        name: 'Work task test',
        description: 'Test description',
        category: 'work',
      };
      const res = await chai
        .request(appUrl)
        .post('/tasks')
        .send(newTask);
      expect(res).to.have.status(201);
      expect(res.body).to.have.keys(
        'id',
        'name',
        'description',
        'category',
        'state',
      );
      expect(res.body.name).to.equal(newTask.name);
      expect(res.body.description).to.equal(newTask.description);
      expect(res.body.category).to.equal(newTask.category);
      expect(res.body.state).to.equal('todo');
    });

    it('should return new task without description', async () => {
      const newTask = {
        name: 'Work task test',
        category: 'work',
      };
      const res = await chai
        .request(appUrl)
        .post('/tasks')
        .send(newTask);
      expect(res).to.have.status(201);
      expect(res.body).to.have.keys('id', 'name', 'category', 'state');
      expect(res.body.name).to.equal(newTask.name);
      expect(res.body.category).to.equal(newTask.category);
      expect(res.body.state).to.equal('todo');
    });

    it('should return new task with non default state', async () => {
      const newTask = {
        name: 'Work task test',
        category: 'work',
        state: 'finished',
      };
      const res = await chai
        .request(appUrl)
        .post('/tasks')
        .send(newTask);
      expect(res).to.have.status(201);
      expect(res.body).to.have.keys('id', 'name', 'category', 'state');
      expect(res.body.name).to.equal(newTask.name);
      expect(res.body.category).to.equal(newTask.category);
      expect(res.body.state).to.equal('finished');
    });

    it('should return error when name is missing', async () => {
      const newTask = {
        description: 'Test description',
        category: 'work',
      };
      const res = await chai
        .request(appUrl)
        .post('/tasks')
        .send(newTask);
      expect(res).to.have.status(400);
      expect(res.body).to.have.keys('title', 'detail', 'errors');
      expect(res.body.title).to.equal('Validation Error');
    });

    it('should return error when category is invalid', async () => {
      const newTask = {
        name: 'Work task test',
        description: 'Test description',
      };
      const res = await chai
        .request(appUrl)
        .post('/tasks')
        .send(newTask);
      expect(res).to.have.status(400);
      expect(res.body).to.have.keys('title', 'detail', 'errors');
      expect(res.body.title).to.equal('Validation Error');
    });
  });

  describe('Get all Tasks | GET /tasks', () => {
    it('should return all tasks', async () => {
      const res = await chai
        .request(appUrl)
        .get('/tasks');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('Get Task by ID | GET /tasks/:id', () => {
    it('should return task by id', async () => {
      const res = await chai
        .request(appUrl)
        .get('/tasks/1');
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys(
        'id',
        'name',
        'description',
        'category',
        'status',
      );
    });

    it('should return error when task id is invalid', async () => {
      const res = await chai
        .request(appUrl)
        .get('/tasks/999');
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys('title', 'detail');
      expect(res.body.error).to.equal('Not Found');
    });
  });

  describe('Update Task by ID | PUT /tasks/:id', () => {
    it('should return updated task', async () => {
      const updatedTask = {
        name: 'Work task test updated',
        description: 'Test description updated',
        category: 'work',
        state: 'finished',
      };
      const res = await chai
        .request(appUrl)
        .put('/tasks/1')
        .send(updatedTask);
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys(
        'id',
        'name',
        'description',
        'category',
        'state',
      );
      expect(res.body.name).to.equal(updatedTask.name);
      expect(res.body.description).to.equal(updatedTask.description);
      expect(res.body.category).to.equal(updatedTask.category);
      expect(res.body.state).to.equal('finished');
    });

    it('should return error when task id is invalid', async () => {
      const updatedTask = {
        name: 'Work task test updated',
        description: 'Test description updated',
        category: 'work',
        state: 'finished',
      };
      const res = await chai
        .request(appUrl)
        .put('/tasks/999')
        .send(updatedTask);
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys('title', 'detail');
      expect(res.body.error).to.equal('Not Found');
    });
  });

  describe('Delete Task by ID | DELETE /tasks/:id', () => {
    it('should return deleted task', async () => {
      const res = await chai
        .request(appUrl)
        .delete('/tasks/1');
      expect(res).to.have.status(200);
      expect(res.body).to.have.keys(
        'id',
        'name',
        'description',
        'category',
        'state',
      );
    });

    it('should return error when task id is invalid', async () => {
      const res = await chai
        .request(appUrl)
        .delete('/tasks/999');
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys('title', 'detail');
      expect(res.body.error).to.equal('Not Found');
    });
  });
});
