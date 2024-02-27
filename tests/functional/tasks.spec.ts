/* eslint-disable @typescript-eslint/no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import App from '../../src/app/app';

chai.use(chaiHttp);
const appUrl = 'http://localhost:3000';
const application = new App();

async function cleanDatabase(ids: string[]): Promise<void> {
  await Promise.all(ids.map(async (id) => {
    await chai.request(appUrl)
      .delete(`/tasks/${id}`);
  }));
}

describe('Tasks API', () => {
  const taskIds: string[] = [];
  before(async () => {
    await application.start().catch((error) => {
      console.error('📌 Could not start the application', error);
    });
  });

  after(async () => {
    await cleanDatabase(taskIds);
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
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(201);
      expect(res.body).to.have.keys(
        'id',
        'name',
        'description',
        'category',
        'state',
      );
      expect(res.body.id).to.a('string').and.not.empty;
      expect(res.body.name).to.equal(newTask.name);
      expect(res.body.description).to.equal(newTask.description);
      expect(res.body.category).to.equal(newTask.category);
      expect(res.body.state).to.equal('todo');
      taskIds.push(res.body.id as string);
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
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(201);
      expect(res.body).to.have.keys('id', 'name', 'category', 'state');
      expect(res.body.name).to.equal(newTask.name);
      expect(res.body.category).to.equal(newTask.category);
      expect(res.body.state).to.equal('todo');
      taskIds.push(res.body.id as string);
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
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(201);
      expect(res.body).to.have.keys('id', 'name', 'category', 'state');
      expect(res.body.name).to.equal(newTask.name);
      expect(res.body.category).to.equal(newTask.category);
      expect(res.body.state).to.equal('finished');
      taskIds.push(res.body.id as string);
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
      console.log('Response Body: ', res.body);
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
      console.log('Response Body: ', res.body);
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
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('Get Task by ID | GET /tasks/:id', () => {
    it('should return task by id', async () => {
      const res = await chai
        .request(appUrl)
        .get(`/tasks/${taskIds[0]}`);
      console.log('Response Body: ', res.body);
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
        .get('/tasks/999');
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(400);
      expect(res.body).to.have.keys('title', 'detail');
      expect(res.body.title).to.equal('Validation Error');
    });

    it('should return error when task with id is not found', async () => {
      const res = await chai
        .request(appUrl)
        .get('/tasks/e6eb0184-7935-46ee-bcfe-d3329e6a6d68');
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys('title', 'detail');
      expect(res.body.title).to.equal('Not Found');
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
        .put(`/tasks/${taskIds[0]}`)
        .send(updatedTask);
      console.log('Response Body: ', res.body);
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
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(400);
      expect(res.body).to.have.keys('title', 'detail');
      expect(res.body.title).to.equal('Validation Error');
    });

    it('should return error when task with id is not found', async () => {
      const updatedTask = {
        name: 'Work task test updated',
        description: 'Test description updated',
        category: 'work',
        state: 'finished',
      };
      const res = await chai
        .request(appUrl)
        .put('/tasks/e6eb0184-7935-46ee-bcfe-d3329e6a6d68')
        .send(updatedTask);
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys('title', 'detail');
      expect(res.body.title).to.equal('Not Found');
    });
  });

  describe('Delete Task by ID | DELETE /tasks/:id', () => {
    it('should return 204', async () => {
      const res = await chai
        .request(appUrl)
        .delete(`/tasks/${taskIds[0]}`);
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;
    });

    it('should return error when task id is invalid', async () => {
      const res = await chai
        .request(appUrl)
        .delete('/tasks/999');
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(400);
      expect(res.body).to.have.keys('title', 'detail');
      expect(res.body.title).to.equal('Validation Error');
    });

    it('should return error when task with id is not found', async () => {
      const res = await chai
        .request(appUrl)
        .delete('/tasks/e6eb0184-7935-46ee-bcfe-d3329e6a6d68');
      console.log('Response Body: ', res.body);
      expect(res).to.have.status(404);
      expect(res.body).to.have.keys('title', 'detail');
      expect(res.body.title).to.equal('Not Found');
    });
  });
});
