// /routes/apiRoutes.js
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dbPath = path.join(__dirname, "../db/db.json");

// Helper function to read and write to db.json
const readFromFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });

const writeToFile = (filePath, content) =>
  fs.writeFileSync(filePath, JSON.stringify(content, null, 4));

// GET route for retrieving all notes
router.get("/", async (req, res) => {
  try {
    const notes = await readFromFile(dbPath);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to read notes" });
  }
});

// POST route for adding a new note
router.post("/", async (req, res) => {
  try {
    const { title, text } = req.body;
    const newNote = { id: uuidv4(), title, text };

    const notes = await readFromFile(dbPath);
    notes.push(newNote);
    writeToFile(dbPath, notes);

    res.json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

// DELETE route for deleting a note
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let notes = await readFromFile(dbPath);
    notes = notes.filter((note) => note.id !== id);
    writeToFile(dbPath, notes);

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;