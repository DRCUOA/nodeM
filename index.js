/**
 * BookSummaries
 * V0.1.0 - Release Date 5 July 2022
 * (c) & author Richard Clark 2022
 */

const express = require('express');
const app = express();
const Joi = require('joi');

//setup link to mock database
const database = require('./database');
const books = database;


// set up handlebars (not dep 5.4.3 )
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
  defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// middleware 
// express.json() adds a bit of middleware and 'app.use' makes the app use that middleware in the req processing pipeline
app.use(express.json());
// express.urlencoded() enables read of key&value based HTTP requests and parses them into the res.body object  - give it the object ({extended: true}) or false depending if you want it to be able to parse arrays and complex objects.
app.use(express.urlencoded({ extended: true }));
// express.static is middleware to serve static files
// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const logger = require('./middleware/logger');
app.use(logger);

const auth = require('./middleware/auth');
const { string } = require('joi');
const { parse } = require('path');
app.use(auth);


//SEARCH

app.post("/search", (req, res) => {
  let searchSet = books.summary;
  let searchString = req.body.searchString.toLowerCase()
  console.log(searchString);
  let filteredSet = searchSet.filter((value) => {
    if(value.name.includes(searchString))
    return value;
  });
  res.render("home",{data : filteredSet});
});

// CREATE using post convention, always validate post input
app.post("/api/books", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    // convention is respond with error code '400 Bad Request'
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: books.length + 1,
    name: req.body.name  // need to enable parsing of JSON objects in express, as it is not enabled by default see above - app.use(express,json()); -
  };
  books.push(course);
  res.send(course);
  // by convention, when a server creates a new object/resouce, it should send that object/resource back in the body of the response, so items like id or other params established on the server side are known to the client who made the req.  
});

// READ using GET
app.get("/", (req, res) => {

  const data = books.summary;
  res.render("home", { data: data });
});

app.get("/api/books", (req, res) => {
  res.send(books.summary)
});

// req.params returns an string, and id param is an integer.  Make sure your implementation data object types match
app.get("/api/books/:id", (req, res) => {
  const lookUp = parseInt(req.params.id);
  const requestedPath = books.summary[lookUp].path.slice(6);
  res.redirect(`${requestedPath}`);
});

//UPDATE using PUT

app.put("/api/books/:id", (req, res) => {
  // logic - 
  // look up the course using the param ID  
  // if not found, return 404 Not Found, otherwise, 
  const course = getCourseById(req, res);

  //  validate the course
  const { error } = validateCourse(req.body); // using object destructuring
  if (error) {
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
app.delete("/api/books/:id", (req, res) => {
  // logic
  //  look-up course, if not found, return 404
  const course = getCourseById(req, res);
  //  delete if found
  const index = books.indexOf(course);
  books.splice(index, 1);
  //  respond with delete course object
  res.send(course);
});

// start the app running.  Define PORT -assign using the process object or default 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

// global functions for use in more than one operation above.
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(course);
};