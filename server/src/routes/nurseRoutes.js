import express from "express";
import {
  addNurse,
  getNurse,
  getAllNurses,
  updateNurseStatus,
  revokeNurseLicense,
} from "../controllers/nurseController.js";

const router = express.Router();

router.post("/", addNurse);
router.get("/", getAllNurses);
router.get("/:licenseNumber", getNurse);
router.patch("/:licenseNumber/status", updateNurseStatus);
router.patch("/:licenseNumber/revoke", revokeNurseLicense);

export default router;
