const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

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

app.post('/issues', async (req, res) => {
    const issue = new Issue(req.body);
    await issue.save();
    res.status(201).json(issue);
});

app.get('/issues', async (req, res) => {
    try {
        const { type } = req.params;
        const issues = await Issue.find({});
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

app.put('/issue/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Invalid ID');
        return res.status(400).send('Invalid ID');
    }

    try {
        const issue = await Issue.findByIdAndUpdate(id, req.body, { new: true });

        if (!issue) {
            return res.status(404).send('Issue with the given ID was not found');
        }

        res.status(200).json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/issue/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Invalid ID');
        return res.status(400).send('Invalid ID');
    }

    try {
        const issue = await Issue.findByIdAndDelete(id);

        if (!issue) {
            return res.status(404).send('Issue with the given ID was not found');
        }
        res.status(204).json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { app, Issue };