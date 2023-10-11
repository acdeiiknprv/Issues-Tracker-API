const { Issue } = require('../../models/issue');
const dbConnect = require('../../utils/db');

module.exports = async (req, res) => {
    console.log(`Received ${req.method} request`);
    // Set CORS headers
    res.setHeader('Access-Control-Max-Age', '2592000');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    await dbConnect();
    const id = req.query.id;

    try {
        switch (req.method) {
            case 'GET':
                const issue = await Issue.findById(id);
                if (!issue) return res.status(404).send('Issue not found');
                return res.status(200).json(issue);

            case 'PUT':
                const body = req.body;
                const error = validateIssue(new Issue(body));
                if (error) return res.status(400).send(error);
                const updatedIssue = await Issue.findByIdAndUpdate(id, body, { new: true });
                if (!updatedIssue) return res.status(404).send('Issue not found');
                return res.status(200).json(updatedIssue);

            case 'DELETE':
                const deletedIssue = await Issue.findByIdAndDelete(id);
                if (!deletedIssue) return res.status(404).send('Issue not found');
                return res.status(204).end();

            default:
                return res.status(405).end();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};
