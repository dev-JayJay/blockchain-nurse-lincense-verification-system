import express from "express";
import { submitVerifierRegistration, listPendingVerifiers, approveVerifier, rejectVerifier, logs, start } from "../controllers/verifierController.js";

const router = express.Router();

// Public
router.post("/register", submitVerifierRegistration);

// Admin
router.get("/logs", logs);
router.get("/stats", start);
router.get("/pending", listPendingVerifiers);
router.post("/:id/approve", approveVerifier);
router.post("/:id/reject", rejectVerifier);

export default router;
