import express from "express";
import {
  createJob,
  updateJob,
  deactivateJob,
  getRecruiterJobs,
  getAllJobs,
  getJobById,
} from "../controllers/job.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes (no token required)
router.get("/all", getAllJobs);          // GET /api/v1/jobs/all - Browse all active jobs
router.get("/:id", getJobById);          // GET /api/v1/jobs/:id - Get single job details

// Protected routes - recruiters only
router.use(protect);
router.use(authorize("recruiter"));

router.route("/")
  .post(createJob)                       // POST /api/v1/jobs - Create a job
  .get(getRecruiterJobs);                // GET  /api/v1/jobs - Get recruiter's jobs

router.patch("/:id", updateJob);         // PATCH /api/v1/jobs/:id - Update a job
router.patch("/:id/deactivate", deactivateJob); // PATCH /api/v1/jobs/:id/deactivate

export default router;