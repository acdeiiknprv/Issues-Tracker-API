const axios = require('axios');
const readlineSync = require('readline-sync');

async function main() {
    let action;
    while (action !== 'exit') {
        action = readlineSync.question('Choose action [create, read, update, delete, exit]: ');
        switch (action) {
            case 'create':
                let title = "";
                while (title.length < 3) {
                    title = readlineSync.question('Enter title: ');
                    if (title.length < 3) {
                        console.log('Title must be at least 3 characters long');
                    }
                }
                const description = readlineSync.question('Enter description: ');
                let type = "";
                while (type !== 'bug' && type !== 'refacto' && type !== 'feature') {
                    type = readlineSync.question('Enter type [bug, refacto, feature]: ');
                    if (type !== 'bug' && type !== 'refacto' && type !== 'feature') {
                        console.log('Invalid type, please enter bug, refacto or feature');
                    }
                }
                try {
                    const res = await axios.post('http://localhost:3000/issues', { title, description, type });
                    console.log(res.data);
                } catch (err) {
                    console.error(err.message);
                }
                break;
            case 'read':
                let readType = "_";
                while (readType !== 'bug' && readType !== 'refacto' && readType !== 'feature' && readType !== '') {
                    readType = readlineSync.question('Enter type of issue to read (bug, refacto, feature) or press enter to read all: ');
                    if (readType !== 'bug' && readType !== 'refacto' && readType !== 'feature' && readType !== '') {
                        console.log('Invalid type, please enter bug, refacto, feature, or press enter.');
                    }
                }
                let readUrl = 'http://localhost:3000/issues';
                if (readType) readUrl += `/${readType}`;
                try {
                    const response = await axios.get(readUrl);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching issues:', error);
                }
                break;
            case 'update':
                const idToUpdate = readlineSync.question('Enter id to update: ');
                let updatedTitle = "";
                while (updatedTitle.length < 3) {
                    updatedTitle = readlineSync.question('Enter new title: ');
                    if (updatedTitle.length < 3) {
                        console.log('Title must be at least 3 characters long');
                    }
                }
                const updatedDescription = readlineSync.question('Enter new description: ');
                let updatedType = "";
                while (updatedType !== 'bug' && updatedType !== 'refacto' && updatedType !== 'feature') {
                    updatedType = readlineSync.question('Enter new type [bug, refacto, feature]: ');
                    if (updatedType !== 'bug' && updatedType !== 'refacto' && updatedType !== 'feature') {
                        console.log('Invalid type, please enter bug, refacto or feature');
                    }
                }
                try {
                    const res = await axios.put(`http://localhost:3000/issue/${idToUpdate}`, { title: updatedTitle, description: updatedDescription, type: updatedType });
                    console.log(res.data);
                } catch (err) {
                    switch (err.response.status) {
                        case 400:
                            console.error('Invalid ID');
                            break;
                        case 404:
                            console.error('Issue with the given ID was not found');
                            break;
                        default:
                            break;
                    }
                }
                break;
            case 'delete':
                const idToDelete = readlineSync.question('Enter id to delete: ');
                try {
                    await axios.delete(`http://localhost:3000/issue/${idToDelete}`);
                    console.log('Deleted successfully');
                } catch (err) {
                    switch (err.response.status) {
                        case 400:
                            console.error('Invalid ID');
                            break;
                        case 404:
                            console.error('Issue with the given ID was not found');
                            break;
                        default:
                            break;
                    }
                }
                break;
            case 'exit':
                console.log('Exiting...');
                break;
            default:
                console.log('Invalid action, please enter create, read, update, delete, or exit.');
                break;
        }
    }
}

main();
