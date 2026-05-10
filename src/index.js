import dotenv from "dotenv";
import app from "./app.js";
import { connectDB, closeDB } from "./db/connect.js";

dotenv.config({ path: "./.env" });

let server;

connectDB()
  .then(() => {
    server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!!!", err);
  });

// Graceful shutdown (should be in index.js)
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} signal received: closing HTTP server`);
  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
    });
  }
  try {
    await closeDB();
    console.log("Database connection closed");
  } catch (err) {
    console.error("Error during shutdown:", err);
  }
  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
