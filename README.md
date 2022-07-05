<h1 style="color: rgb(255,69,0)">Practice Webapp</h1>
<h3>#author Richard Clark : Student | Contact Comments/Feedback : <a href="mailto:richarddclark@gmail.com">Email Author</a></h3>

<h3 style="text-decoration: underline">Introduction</h3>
<p>This repo contains the source code for a practice exercise of developing an application from scratch.  The goal is to improve my skills and ability to develop prototype full stack applications that work across all OS, including mobile OS.  Initialy just running in common browsers (ChromeV8 and JS supporting) and the devices that support such browers.  Stage 2 implementation will look at native OS development for Android and IOS.</p>
<h3 style="text-decoration: underline">Stack</h3>

| Component    | Software (V0.1.0)        | Planned Implementation (V1.0.0) |
| ------------ | ------------------------ | ------------------------------- |
| Database     | Mock nosql db (js array) | MySQL or MongoDB                |
| Back-end     | Node/Express             | Node/Express                    |
| View Engine  | Handlebars               | Handlebars                      |
| Front-End/UI | Bootstrap 4.0            | Bootstrap 5.0                   |

<h3 style="text-decoration: underline">Outline design</h3>
<p>The basic aim of this app is to allow user to browse and search book summaries</p>
<p>The V0.1.0 requirements for this have been defined as:</p>

| ID  | Requirement | Purpose/Description  | Implementation Status |
| --- | ----------- | -------------------- | --------------------- |
| 1   | Render Home Page | Display in browser a simple home page with fixed header and list of available book summaries in table form | Complete|
| 2   | Search Feature | Within the fixed header, include a search box that enables user to enter any text and on enter, the table will filter to show only book summaries whose names include the text entered in the search box | Complete|
| 3   | Display Book Summary on user selection event | When user clicks on the name of the book summary within the list, the related PDF document with open in preview with the browser | Complete |
| 4   | Users can create an account | Users can create an account by chosing a username, adding an email address and selected a password. Usernames must be unique and passwords must conform to following: <ul><li>min 8 characters length</li><li>must contain at least 1 uppercase char</li><li>must contain at least 1 special char</li><li>must be entered twice at time of creation by user</li></ul> | To-Do |
| 5   | Passwords are stored with appropriate security| User password's are hashed and salted when saved and stored only as the hash within the db | To Do |
| 6   | Users are required to sign-in and are authenciated when accessing resources | Only users with accounts can access resources beyond using creating account/login features. Each and every request for a resource to the server is authenciated. | To-Do |


<h3 style="text-decoration: underline">Release details:</h3>

| Version Number | Date | Release Notes | Host | Intended Audience | Open Access URL 
| -------------- | -------- | ------------------------------------------------------------------------------------------ | ------------ | ------------------------------ | ------------ |
| 0.1.0          | 5-Jul-22 | Inital Beta: <p style="color: red">NOTE: Security requirements not met in this release</p> | Heroku Cloud | family/friends as beta testers | https://peaceful-dry-tortugas-26878.herokuapp.com/ |

<p style="text-decoration: underline"><strong>Detailed Release Notes</strong></p>
<pre>
 <ol>
  <li>DATABASE : Created a mock database by populating a subdirectory with a set 1,060 pdf files, each representing a summary of a published book.  I've used js in the middle of the stack, to read the contents of this folder and store as a JSON array.  This JSON array is then set to be my mock database for use in the rest of the stack.</li>
    <ul>Investigating options now on adding SQL or Document actual db</ul>
  <li>BACK-END : Using Node.js and Expres</li>
  <li>FRONT-END : The user interface is constructed using Boostrap and handlebars</li>
</ol>
</pre>