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
          try {
            const res = await axios.post('http://localhost:3000/issues', { title, description });
            console.log(res.data);
          } catch (err) {
            console.error(err.message);
          }
          break;
        case 'read':
          try {
            const response = await axios.get('http://localhost:3000/issues');
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching issues:', error);
          }
          break;
        case 'update':
          const idToUpdate = readlineSync.question('Enter id to update: ');
          const updatedTitle = readlineSync.question('Enter new title: ');
          const updatedDescription = readlineSync.question('Enter new description: ');
          try {
            const res = await axios.put(`http://localhost:3000/issue/${idToUpdate}`, { title: updatedTitle, description: updatedDescription });
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
  