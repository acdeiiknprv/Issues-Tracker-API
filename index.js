const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));
;

const IssueSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String
  });

const Issue = mongoose.model('Issue', IssueSchema);

app.use(bodyParser.json());

// Create Issue
app.post('/issues', async (req, res) => {
  const issue = new Issue(req.body);
  await issue.save();
  res.status(201).json(issue);
});

// Read Issues

app.get('/issues', async (req, res) => {
    try {
        const { type } = req.params;
        const issues = await Issue.find({ });
        res.json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/issues/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const issues = await Issue.find({ type });
        res.json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Update Issue
app.put('/issue/:id', async (req, res) => {
  const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(issue);
});

// Delete Issue
app.delete('/issue/:id', async (req, res) => {
  await Issue.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = { app, Issue };