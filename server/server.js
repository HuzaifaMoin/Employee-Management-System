import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRouter from "./routes/authRoute.js";
import profileRouter from "./routes/profileRoute.js";
import attendanceRouter from "./routes/attendanceRoute.js";
import leaveRouter from "./routes/leaveRoute.js";
import payslipRouter from "./routes/payslipRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
});
// Health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API Routes
app.use("/api/auth", authRouter)
app.use("/api/employees", employeeRoutes);
app.use("/api/profile", profileRouter)
app.use("/api/attendance", attendanceRouter)
app.use("/api/leave", leaveRouter)
app.use("/api/payslips", payslipRouter)
app.use("/api/dashboard", dashboardRouter)

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});