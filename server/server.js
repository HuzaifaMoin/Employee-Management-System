import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRouter from "./routes/authRoute.js";
import profileRouter from "./routes/profileRoute.js";
import attendanceRouter from "./routes/attendanceRoute.js";
import leaveRouter from "./routes/leaveRoute.js";
import payslipRoute from "./routes/payslipRoute.js";
import payslipRouter from "./routes/payslipRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";

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
app.use("/api/auth", authRouter)
app.use("/api/employees", employeeRoutes);
app.use("/api/profile", profileRouter)
app.use("/api/attendance", attendanceRouter)
app.use("/api/leave", leaveRouter)
app.use("/api/leave", leaveRouter)
app.use("/api/payslips", payslipRouter)
app.use("/api/dashboard", dashboardRouter)

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});