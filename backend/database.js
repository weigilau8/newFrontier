const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db');

// Create the tasks table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0
        )
    `);

    // Insert initial data only if table is empty
    db.get('SELECT COUNT(*) as count FROM tasks', (err, row) => {
        if (row.count === 0) {
            const stmt = db.prepare('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)');
            stmt.run('Test Project', 'Finish the task management app', 0);
            stmt.run('Hungry', 'Eat Vegetables', 1);
            stmt.run('Bank', 'Check why i cant login', 0);
            stmt.run('Apply Jobs', 'Need to apply jobs', 0);
            stmt.finalize();
        }
    });
});

module.exports = db;
