import express from "express";
import { registerRecruiter } from "../controllers/auth.controller.js";
import { registerCandidate } from "../controllers/candidate.controller.js";

const router = express.Router();

// POST /api/v1/auth/recruiter/register - to register recruiters
router.route('/recruiter/register').post(registerRecruiter);

// POST /api/v1/auth/candidate/register - to register candidates
router.post("/candidate/register", registerCandidate)

export default router;