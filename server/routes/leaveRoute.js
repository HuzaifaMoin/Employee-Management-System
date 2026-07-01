import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { createLeave, getLeaves, updateLeaveStatus } from "../controllers/leaveController.js";

const leaveRouter = Router();

leaveRouter.post("/", (req, res, next) => {
    console.log("POST /api/leave reached");
    next();
}, protect, createLeave);
leaveRouter.get('/', protect, getLeaves)
leaveRouter.patch('/:id', protect, protectAdmin, updateLeaveStatus)

export default leaveRouter;