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
    if (typeof description !== 'string') return "Description must be a string";
    if (description.length < 5 || description.length > 100) return "Description must be between 5 and 100 characters";
    
    const date = new Date(issue.dueDate);
    if (!(date instanceof Date) || isNaN(date.getTime())) return "Due date must be a valid date format";
    
    return null;
}
module.exports = { validateIssue };