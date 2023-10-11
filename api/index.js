module.exports = (req, res) => {
    res.status(200).send({
        message: 'Welcome to the Issue Tracker API!',
        endpoints: {
            listIssues: '/issues',
            addIssue: {
                method: 'POST',
                path: '/issues',
                body: {
                    name: 'Issue Name (String)',
                    description: 'Issue Description (String)',
                    dueDate: 'Due Date (Date format)'
                }
            },
            updateIssue: {
                method: 'PUT',
                path: '/issues/:id',
                body: {
                    name: '(Optional) Updated Name',
                    description: '(Optional) Updated Description',
                    dueDate: '(Optional) Updated Due Date'
                }
            },
            deleteIssue: {
                method: 'DELETE',
                path: '/issues/:id'
            }
        }
    });
};
