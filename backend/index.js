const express = require('express');
const Database = require('better-sqlite3'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion plus simple et robuste
const db = new Database('./db.sqlite');

// Création de la table en mode synchrone
db.exec(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT
)`);

// Routes adaptées à la nouvelle syntaxe (plus propre, pas de callback)
app.get('/tasks', (req, res) => {
  const rows = db.prepare('SELECT * FROM tasks').all();
  res.json(rows);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const info = db.prepare('INSERT INTO tasks (title) VALUES (?)').run(title);
  res.json({ id: info.lastInsertRowid, title });
});

app.delete('/tasks/:id', (req, res) => {
  db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Port dynamique pour Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});