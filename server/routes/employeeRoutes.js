import { Router } from "express";
import express from "express";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/",protect, protectAdmin, getEmployees);
router.post("/",protect, protectAdmin, createEmployee);
router.put("/:id",protect, protectAdmin, updateEmployee);
router.delete("/:id",protect, protectAdmin, deleteEmployee);

export default router;