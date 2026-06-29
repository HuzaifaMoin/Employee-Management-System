import express from "express";
import { Router } from "express";
import { createPayslip, getPayslips, getPayslipById } from "../controllers/payslipController.js";
import { protect, protectAdmin } from "../middleware/auth.js";
const payslipRouter = express.Router();

payslipRouter.post("/", protect, protectAdmin, createPayslip);
payslipRouter.get("/", protect, protectAdmin, getPayslips);
payslipRouter.get("/:id", protect, protectAdmin, getPayslipById);

export default payslipRouter;