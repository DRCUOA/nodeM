#author Richard Clark : Student   
<h2 style="text-decoration: underline">Practice Webapp</h2>
<h3 style="text-decoration: underline">Stack</h3>
<table>
<thead>
  <th>Component</th>
  <th>Software Used</th>
<thead> 
  <tr>
    <td>Database</td>
    <td>Mock nosql db (js array)</td>
  </tr>
  <tr>  
    <td>Back-end</td>
    <td>Node.js/Exprss</td>
  </tr>
  <tr>  
    <td>Front-End/UI</td>
    <td>Bootstrap/Handlebars UI</td>
  </tr>
</table>
<h3 style="text-decoration: underline">Introduction</h3>
<p>This repo is a personal practice exercise of writing code with the aim of improve my skills and ability to develop prototype full stack apps.</p><br>
<h3 style="text-decoration: underline">Outline design</h3>
<p>The basic aim of this app is to allow user to browse and search book summaries</p>
<p>The V0.1.0 requirements for this have been defined as:</p>
<table>
<thead>
  <th>ID</th>
  <th>Requirement</th>
  <th>Purpose/Description</th>
  <th>Implementation Status</th> 
<thead> 
  <tr>
    <td>1</td>
    <td>Render Home Page</td>
    <td>Display in browser a simple home page with fixed header and list of available book summaries in table form</td>
    <td>Complete</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Search Feature</td>
    <td>Within the fixed header, include a search box that enables user to enter any text and on enter, the table will filter to show only book summaries whose names include the text entered in the search box</td>
    <td>Complete</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Display Book Summary on user selection event</td>
    <td>When user clicks on the name of the book summary within the list, the related PDF document with open in preview with the browser</td>
    <td>Complete</td>
  </tr>
</table>

<h3 style="text-decoration: underline">Stack implementation details:</h3>
<ol>
  <li>DATABASE : Created a mock database by populating a subdirectory with a set 1,060 pdf files, each representing a summary of a published book.  I've used js in the middle of the stack, to read the contents of this folder and store as a JSON array.  This JSON array is then set to be my mock database for use in the rest of the stack.</li>
  <li>BACK-END : Using Node.js and Expres</li>
  <li>FRONT-END : The user interface is constructed using Boostrap and handlebars</li>
</ol>

<h3></h3>
<p></p>
<table>
<thead>
  <th></th>
  <th></th>
  <th></th>
<thead> 
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>  
</table>
