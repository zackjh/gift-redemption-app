import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open a database connection
export const db = open({
  filename: "./db/database.sqlite",
  driver: sqlite3.Database,
});

export async function initialiseDb() {
  const database = await db;
  await database.exec(
    `
    CREATE TABLE IF NOT EXISTS redemptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      staffPassId TEXT NOT NULL,
      teamName TEXT NOT NULL,
      redeemedAt INTEGER NOT NULL
    );
    `
  );
  console.log("The database has been initialised successfully.");
}
