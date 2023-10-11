const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

function validateIssue(issue) {
    const requiredFields = ['name', 'description', 'dueDate'];
    for (const field of requiredFields) {
        if (!issue[field]) {
            return `${field} is required`;
        }
    }

    const name = issue.name;
    if (typeof name !== 'string') return "Name must be a string";
    if (name.length < 3 || name.length > 50) return "Name must be between 3 and 50 characters";

    const description = issue.description;
    if (typeof issue.description !== 'string') return "Description must be a string";
    if (description.length < 5 || description.length > 100) return "Description must be between 5 and 100 characters";
    
    const date = new Date(issue.dueDate);
    if (!(date instanceof Date) || isNaN(date.getTime())) return "Due date must be a valid date format";
    
    return null;
}

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));
;

const IssueSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    createDate: Date,
});

const Issue = mongoose.model('Issue', IssueSchema);

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.use('/issues/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID');
    }
    next();
});

app.post('/issues', async (req, res) => {
    const issue = new Issue(req.body);
    const error = validateIssue(issue);
    if (error) {
        return res.status(400).send(error);
    }
    await issue.save();
    res.status(201).json(issue);
});

app.get('/issues', async (req, res, next) => {
    console.log("GET");
    try {
        const issues = await Issue.find({});
        res.json(issues);
    } catch (error) {
        next(error);
    }
});

app.get('/issues/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const issues = await Issue.find({ _id: id });
        res.json(issues);
    } catch (error) {
        next(error);
    }
});

app.put('/issues/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const issue = await Issue.findByIdAndUpdate(id, req.body, { new: true });

        if (!issue) {
            return res.status(404).send('Issue with the given ID was not found');
        }

        res.status(200).json(issue);
    } catch (error) {
        next(error);
    }
});

app.delete('/issues/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const issue = await Issue.findByIdAndDelete(id);

        if (!issue) {
            return res.status(404).send('Issue with the given ID was not found');
        }
        res.status(204).json(issue);
    } catch (error) {
        next(error);
    }
});

module.exports = { app, Issue };