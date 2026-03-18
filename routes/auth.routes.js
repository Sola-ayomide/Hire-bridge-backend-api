import express from "express";
import {
  registerRecruiter,
  registerCandidate,
  login,
  matchCandidateToJob,
} from "../controllers/auth.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
 
const router = express.Router();
 
// Public Routes (no token required)

// POST /api/v1/auth/recruiter/register - Register a new recruiter
router.post("/recruiter/register", registerRecruiter);
 
// POST /api/v1/auth/candidate/register - Register a new candidate
router.post("/candidate/register", registerCandidate);
 
// POST /api/v1/auth/login - Login for both candidates and recruiters
router.post("/login", login);
 
// Protected Routes (token required)
 
// GET /api/v1/auth/match - Match candidates to jobs (recruiter only)
router.get("/match", protect, authorize("recruiter"), matchCandidateToJob);
 
export default router;