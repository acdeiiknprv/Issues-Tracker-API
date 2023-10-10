const request = require('supertest');
const { app, Issue } = require('../index.js');

const IssueChecker = (issue) => {
  expect(issue).toHaveProperty('name').toBeInstanceOf(String);
  expect(issue).toHaveProperty('description').toBeInstanceOf(String);
  expect(issue).toHaveProperty('dueDate').toBeInstanceOf(Date);
}

let server;
beforeAll(() => {
  server = app.listen(3000);
});

afterEach(async () => {
  await Issue.deleteMany({});
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
      name: "Test Title",
      description: "Test Description",
      dueDate: new Date("2020-01-01"),
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe('Test Title');
});

test('It should update the issue', async () => {
  const issue = new Issue({ name: 'Test Title', description: 'Test Description', dueDate: new Date("2020-01-01") });
  await issue.save();

  const response = await request(app)
    .put(`/issues/${issue.id}`)
    .send({
      name: 'Updated Title'
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe('Updated Title');
});

test('It should delete the issue', async () => {
  const issue = new Issue({ name: 'Test Title', description: 'Test Description', dueDate: new Date("2020-01-01") });
  await issue.save();

  const response = await request(app).delete(`/issues/${issue.id}`);
  expect(response.statusCode).toBe(204);
});