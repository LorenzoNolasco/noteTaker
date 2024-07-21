//Import Express.js
const express = require("express");

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require("path");

//initialize an instance of express.js
const app = express();

//PORT
const PORT = 3000;

//Static  middleware pointing to the public folder
app.use(express.static("public"));

app.get("/homepage", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () => console.log(`http://localhost:${PORT} Activated...`))