import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import {protect, protectAdmin} from "../middleware/auth.js";

const dashboardRouter = express.Router();

// GET /api/dashboard
dashboardRouter.get("/", protect, getDashboard);

export default dashboardRouter;