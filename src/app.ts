import path from "path";
import express from "express";
import { initialiseDb } from "./models/db";
import { dataStore } from "./dataStore";
import routes from "./routes";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Initialise Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

// API routes
app.use("/api", routes);

/**
 * Starts the server after initialising the database and loading data.
 */
async function startServer() {
  await initialiseDb();
  await dataStore.load();
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

// Start the server
startServer().catch((error) =>
  console.error("Failed to start the server:", error)
);
