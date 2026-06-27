import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Employee Routes
app.use("/api/employees", employeeRoutes);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});