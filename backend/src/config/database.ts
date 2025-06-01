import sqlite3 from "sqlite3";
import { Database } from "sqlite3";

let db: Database;

export const setupDatabase = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database("./health_tracker.db", (err) => {
            if (err) {
                console.error("Error opening database:", err);
                reject(err);
                return;
            }

            // Create users table
            db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone TEXT UNIQUE NOT NULL,
          name TEXT,
          email TEXT,
          blood_group TEXT,
          age INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

            // Create documents table
            db.run(`
        CREATE TABLE IF NOT EXISTS documents (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          title TEXT NOT NULL,
          file_path TEXT NOT NULL,
          folder_id INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (folder_id) REFERENCES folders(id)
        )
      `);

            // Create folders table
            db.run(`
        CREATE TABLE IF NOT EXISTS folders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          name TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);

            // Create reminders table
            db.run(`
        CREATE TABLE IF NOT EXISTS reminders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          title TEXT NOT NULL,
          description TEXT,
          reminder_date DATETIME NOT NULL,
          is_recurring BOOLEAN DEFAULT 0,
          recurrence_pattern TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);

            console.log("Database setup completed");
            resolve();
        });
    });
};

export const getDatabase = (): Database => {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db;
};
