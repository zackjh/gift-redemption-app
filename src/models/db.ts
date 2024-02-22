import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { join } from "path";

let db: Promise<Database>;

export async function initialiseDb() {
  db = open({
    filename: join(__dirname, "../db/database.sqlite"),
    driver: sqlite3.Database,
  });

  // Wait for the database connection to open and then execute SQL to create the table
  const database = await db;
  await database.exec(`
        CREATE TABLE IF NOT EXISTS redemptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            staffPassId TEXT NOT NULL,
            teamName TEXT NOT NULL,
            redeemedAt INTEGER NOT NULL
        );
    `);

  console.log("The database has been initialized successfully.");
}

// Execute the initialisation function and catch any errors
initialiseDb().catch((error) => {
  console.error("Failed to initialize the database:", error);
});

// Export 'db' for use in the rest of the application
export { db };
