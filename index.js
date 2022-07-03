const express = require ('express');
const app = express();
const Joi = require('joi');
const database = require('./database');

//setup link to mock database
const courses = database;

// middleware 

app.use(express.json()); // express.json() adds a bit of middleware and 'app.use' makes the app use that middleware in the req processing pipeline

const logger = require('./middleware/logger');
app.use(logger);

const auth = require('./middleware/auth');
const { string } = require('joi');
app.use(auth);

// CREATE using post convention, always validate post input
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
    if(error) {
      // convention is respond with error code '400 Bad Request'
      res.status(400).send(error.details[0].message); 
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name  // need to enable parsing of JSON objects in express, as it is not enabled by default see above - app.use(express,json()); -
  };
  courses.push(course);
  res.send(course);
   // by convention, when a server creates a new object/resouce, it should send that object/resource back in the body of the response, so items like id or other params established on the server side are known to the client who made the req.  
  });

// READ using GET
app.get("/", (req,res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req,res) => {
  res.send(courses); 
});

// req.params returns an string, and id param is an integer.  Make sure your implementation data object types match
app.get("/api/courses/:id", (req, res) => {
  const course = lookupCourse(req, res)
  res.send(course);
});

//UPDATE using PUT

  app.put("/api/courses/:id", (req, res) => {
    // logic - 
    // look up the course using the param ID  
    // if not found, return 404 Not Found, otherwise, 
  const course = lookupCourse(req, res);

  //  validate the course
  const { error } = validateCourse(req.body); // using object destructuring
  if(error) {
    // convention is respond with error code '400 Bad Request'
    res.status(400).send(error.details[0].message); 
    return;
  };

  // otherwise, update the course and
  course.name = req.body.name;

  //  return the updated course to the client  
  res.send(course);
});


// DELETE, using DELETE
app.delete("/api/courses/:id", (req, res) => {
// logic
//  look-up course, if not found, return 404
const course = lookupCourse(req, res);
//  delete if found
const index = courses.indexOf(course);
courses.splice(index,1);
//  respond with delete course object
res.send(course);
}); 

// start the app running.  Define PORT -assign using the process object or default 3000.
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}`))

// global functions for use in more than one operation above.
function validateCourse(course) {
  const schema = Joi.object ({
    name: Joi.string().min(3).required()
  });
  return schema.validate(course);
};

function lookupCourse(req, res) {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) // course not found, return 404
    res.status(404).send("Id not found");
  return course;
}