const { Issue } = require('../models/issue');
const { validateIssue } = require('../utils/validators');
const dbConnect = require('../utils/db');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    await dbConnect();

    try {
        switch (req.method) {
            case 'POST':
                const issue = new Issue(req.body);
                const error = validateIssue(issue);
                if (error) return res.status(400).send(error);
                await issue.save();
                return res.status(201).json(issue);

            case 'GET':
                const issues = await Issue.find({});
                return res.json(issues);

            default:
                return res.status(405).end();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};
