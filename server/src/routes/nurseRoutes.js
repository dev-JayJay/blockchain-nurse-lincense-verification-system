import express from "express";
import {
  addNurse,
  getNurse,
  getAllNurses,
} from "../controllers/nurseController.js";

const router = express.Router();

// Create new nurse
router.post("/", addNurse);

// Get all nurses
router.get("/", getAllNurses);

// Get a nurse by license number
router.get("/:licenseNumber", getNurse);

export default router;
