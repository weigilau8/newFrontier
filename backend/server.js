// server.js
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title?.trim() || !description?.trim()) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const stmt = db.prepare('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)');
    stmt.run(title.trim(), description.trim(), 0, function (err) {
        if (err) return res.status(500).json({ error: err.message });

        db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(row);
        });
    });
});

// PUT update task status
app.put('/tasks/:id', (req, res) => {
    const { completed } = req.body;
    const id = parseInt(req.params.id);

    db.run('UPDATE tasks SET completed = ? WHERE id = ?', [!!completed, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
            if (!row) return res.status(404).json({ error: 'Task not found' });
            res.json(row);
        });
    });
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (!row) return res.status(404).json({ error: 'Task not found' });

        db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json(row);
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
