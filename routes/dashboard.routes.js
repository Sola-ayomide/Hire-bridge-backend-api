import express from "express";
import {
  getDashboardStats,
  getCandidatePipeline,
  getRecentApplicants,
} from "../controllers/dashboard.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
 
const router = express.Router();
 
// All routes protected - recruiters only
router.use(protect);
router.use(authorize("recruiter"));
 
router.get("/stats", getDashboardStats);
router.get("/pipeline", getCandidatePipeline);
router.get("/recent-applicants", getRecentApplicants);
 
export default router;