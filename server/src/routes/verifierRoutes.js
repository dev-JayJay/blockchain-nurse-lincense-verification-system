import express from "express";
import {
  submitVerifierRegistration,
  listPendingVerifiers,
  approveVerifier,
  rejectVerifier,
  logs,
  start,
  getAllVerifiers,
} from "../controllers/verifierController.js";

const router = express.Router();

// Public
router.post("/register", submitVerifierRegistration);

// Admin
router.get("/logs/:id", logs);
router.get("/stats/:id", start);
router.get("/all", getAllVerifiers);
router.get("/pending", listPendingVerifiers);
router.post("/:id/approve", approveVerifier);
router.post("/:id/reject", rejectVerifier);

export default router;
