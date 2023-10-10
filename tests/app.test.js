const request = require('supertest');

const endpoint = 'http://localhost:3000';
const { Issue } = require('../models/issue');

const IssueChecker = (issue) => {
  expect(issue).toHaveProperty('name').toBeInstanceOf(String);
  expect(issue).toHaveProperty('description').toBeInstanceOf(String);
  expect(issue).toHaveProperty('dueDate').toBeInstanceOf(Date);
}

afterEach(async () => {
  await Issue.deleteMany({});
});

test('It should respond with an array of issues', async () => {
  const response = await request(endpoint).get('/api/issues');
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

test('It should respond with the posted issue', async () => {
  const response = await request(endpoint)
    .post('/api/issues')
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

  const response = await request(endpoint)
    .put(`/api/issues/${issue.id}`)
    .send({
      name: 'Updated Title'
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe('Updated Title');
});

test('It should delete the issue', async () => {
  const issue = new Issue({ name: 'Test Title', description: 'Test Description', dueDate: new Date("2020-01-01") });
  await issue.save();

  const response = await request(endpoint).delete(`/api/issues/${issue.id}`);
  expect(response.statusCode).toBe(204);
});
