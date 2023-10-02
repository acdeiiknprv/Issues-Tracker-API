const axios = require('axios');
const readlineSync = require('readline-sync');

async function main() {
    let action;
    while (action !== 'exit') {
      action = readlineSync.question('Choose action [create, read, update, delete, exit]: ');
      switch (action) {
        case 'create':
          const title = readlineSync.question('Enter title: ');
          const description = readlineSync.question('Enter description: ');
          const type = readlineSync.question('Enter type [bug, refacto, feature]: ');
          try {
            const res = await axios.post('http://localhost:3000/issues', { title, description, type });
            console.log(res.data);
          } catch (err) {
            console.error(err.message);
          }
          break;
          case 'read':
            const readType = readlineSync.question('Enter type of issue to read (bug, refacto, feature) or press enter to read all: ');
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
          const updatedTitle = readlineSync.question('Enter new title: ');
          const updatedDescription = readlineSync.question('Enter new description: ');
          const updatedType = readlineSync.question('Enter new type [bug, refacto, feature]: ');
          try {
            const res = await axios.put(`http://localhost:3000/issue/${idToUpdate}`, { title: updatedTitle, description: updatedDescription, type: updatedType });
            console.log(res.data);
          } catch (err) {
            console.error(err.message);
          }
          break;
        case 'delete':
          const idToDelete = readlineSync.question('Enter id to delete: ');
          try {
            await axios.delete(`http://localhost:3000/issue/${idToDelete}`);
            console.log('Deleted successfully');
          } catch (err) {
            console.error(err.message);
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
  