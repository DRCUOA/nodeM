/** create a mock db
* use the pdf files to create mock records in a JSON array
*
*/
const dirTree = require('directory-tree');
const mockDb = [];

let id = 0;

const tree = dirTree("./public/assets/pdfs")
tree.children.forEach(fileName => {
  mockDb.push(fileName);
  id++;
});;
  
let books = {
  summary: []
};

mockDb.map((item) => {        
  books.summary.push({ 
      "id" :  '',
      "name" : item.name.slice(0,-4).replace(/-summary/g,' ').replace(/-/g,' ').trim(),
      "path" : item.path      
  });
})

let  i = 0;
Object.entries(books.summary).forEach(([key, value]) => {
  books.summary[key].id = i;
  i++
});

module.exports = books;