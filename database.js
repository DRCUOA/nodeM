const dirTree = require('directory-tree');

/** create a mock db
* use the pdf files to create mock records in a JSON array
*
*/

const mockDb = [];
let id = 0;

const tree = dirTree("./public/assets")
tree.children.forEach(fileName => {
  mockDb.push(fileName);
  id++;
});;
  
let courses = {
  summary: []
};

mockDb.map((item) => {        
  courses.summary.push({ 
      "id" :  '',
      "name" : item.name.slice(0,-4).replace(/-summary/g,' ').replace(/-/g,' ').trim(),
      "path" : item.path      
  });
})

let  i = 0;

Object.entries(courses.summary).forEach(([key, value]) => {
  courses.summary[key].id = i;
  i++
});

module.exports = courses;