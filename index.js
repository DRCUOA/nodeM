/**
 * BookSummaries
 * V0.1.1 - Not Released
 * (c) & author Richard Clark 2022
 */

const config = require('config');
const express = require('express');
const app = express();
const startupDebugger = require('debug')('app:startup');
const dbaseDebugger = require('debug')('app:dbase');

// set view engine

app.set('view-engine', 'pug');
app.set('views', './views');
app.set('default-view', 'index'); 

//Configuration
console.log(`Application Name : ${config.get('name')}`);
console.log(`db-Password    : ${config.get('db.password')}`);
// dev-gen debug
startupDebugger("HTTP Req [tiny] console logging is ON");
// dev-db debug
dbaseDebugger('db console logging on');


// mySQL db


//setup link to mock database
const database = require('./database');
const books = database;

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
  startupDebugger(data);
  res.render("index.pug", { data: data });
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
