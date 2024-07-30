//Import Express.js
const express = require("express");

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require("path");

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//initialize an instance of express.js
const app = express();

//PORT
const PORT = process.env.PORT || 3000;

//Static  middleware pointing to the public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/notes", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => console.log(`http://localhost:${PORT} Activated...`));
