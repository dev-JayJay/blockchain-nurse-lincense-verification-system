import express from "express";
import { createAdmin, getAdmins, login, getAdminlogs } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createAdmin);
router.post("/login", login);
router.get("/logs", getAdminlogs);
router.get("/", protect, getAdmins);

export default router;
