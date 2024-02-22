import express from "express";
import routes from "./routes";
import { initialiseDb } from "./models/db";
import path from "path";
import dotenv from "dotenv";
import { dataStore } from "./dataStore";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the /public directory
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", routes);

async function startServer() {
  await initialiseDb();
  await dataStore.load();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
