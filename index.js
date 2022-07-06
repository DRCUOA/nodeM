/**
 * BookSummaries
 * V0.1.0 - Release Date 5 July 2022
 * (c) & author Richard Clark 2022
 */
const startupDebugger = require('debug')('app:startup');
const dbaseDebugger = require('debug')('app:dbase');
const config = require('config');
const express = require('express');
const app = express();

//Configuration
console.log(`Application Name : ${config.get('name')}`);
console.log(`Mail-Server      : ${config.get('mail.host')}`);
console.log(`Mail-Password    : ${config.get('mail.password')}`);
// dev-gen debug
startupDebugger("HTTP req         : [tiny] logging ON");
// dev-db debug
dbaseDebugger('Database Console Log');

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
// security and http request logging middleware
const helmet = require('helmet');
const morgan = require('morgan');
app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

// app root
app.get("/", (req, res) => {
  const data = books.summary;
  res.render("home", { data: data });
});

// Search route
app.post("/search", (req, res) => {
  let searchSet = books.summary;
  let searchString = req.body.searchString.toLowerCase()
  let filteredSet = searchSet.filter((value) => {
    if (value.name.includes(searchString))
      return value;
  });
  res.render("home", { data: filteredSet });
});

// req.params returns an string, and id param is an integer.  Make sure your implementation data object types match
app.get("/api/books/:id", (req, res) => {
  const lookUp = parseInt(req.params.id);
  const requestedPath = books.summary[lookUp].path.slice(6);
  res.redirect(`${requestedPath}`);
});

// start the app running.  Define PORT -assign using the process object or default 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))
