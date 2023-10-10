const { Issue } = require('../models/issue');
const dbConnect = require('../utils/db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    await dbConnect();
    const id = req.query.id;

    try {
        switch (req.method) {
            case 'GET':
                const issue = await Issue.findById(id);
                if (!issue) return res.status(404).send('Issue not found');
                return res.json(issue);

            case 'PUT':
                const updatedIssue = await Issue.findByIdAndUpdate(id, req.body, { new: true });
                if (!updatedIssue) return res.status(404).send('Issue not found');
                return res.status(200).json(updatedIssue);

            case 'DELETE':
                const deletedIssue = await Issue.findByIdAndDelete(id);
                if (!deletedIssue) return res.status(404).send('Issue not found');
                return res.status(204).end();

            default:
                return res.status(405).end(); // Method Not Allowed
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};
