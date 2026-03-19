import express from "express";
import {
  getCandidateDashboardStats,
  getMyApplications,
  getRecommendedJobs,
  getProfileCompletion,
} from "../controllers/candidate.dashboard.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("candidate"));

// GET /api/v1/candidate/dashboard/stats
router.get("/stats", getCandidateDashboardStats);

// GET /api/v1/candidate/dashboard/applications
router.get("/applications", getMyApplications);

// GET /api/v1/candidate/dashboard/recommended-jobs
router.get("/recommended-jobs", getRecommendedJobs);

// GET /api/v1/candidate/dashboard/profile-completion
router.get("/profile-completion", getProfileCompletion);

export default router;