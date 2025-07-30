import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";  // Import DB connection
import router from "./routes/todoroute.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());               // Allow cross-origin requests
app.use(express.json());        // Parse JSON request bodies

// Routes
app.use("/api", router);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
