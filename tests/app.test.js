const request = require('supertest');
const { app, Issue } = require('../index.js');

let server;
beforeAll(() => {
  server = app.listen(3000);
});

afterAll(done => {
  server.close(done);
});

test('It should respond with an array of issues', async () => {
  const response = await request(app).get('/issues');
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

test('It should respond with the posted issue', async () => {
  const response = await request(app)
    .post('/issues')
    .send({
      title: "Test Title",
      description: "Test Description",
      type: "bug"
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe('Test Title');
});

test('It should respond with an array of issues of a specific type', async () => {
  const response = await request(app).get('/issues/bug');
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

test('It should update the issue', async () => {
  const issue = new Issue({ title: 'Test Title', description: 'Test Description', type: 'bug' });
  await issue.save();

  const response = await request(app)
    .put(`/issue/${issue.id}`)
    .send({
      title: 'Updated Title'
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe('Updated Title');
});

test('It should delete the issue', async () => {
  const issue = new Issue({ title: 'Test Title', description: 'Test Description', type: 'bug' });
  await issue.save();

  const response = await request(app).delete(`/issue/${issue.id}`);
  expect(response.statusCode).toBe(204);
});