import express from "express";
import {
  createJob,
  updateJob,
  deactivateJob,
  getRecruiterJobs,
} from "../controllers/job.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
 
const router = express.Router();
 
// All routes protected - recruiters only
router.use(protect);
router.use(authorize("recruiter"));
 
router
  .route("/")
  .post(createJob)      // POST /api/v1/jobs - Create a job
  .get(getRecruiterJobs); // GET  /api/v1/jobs - Get all recruiter jobs
 
router.patch("/:id", updateJob);              // PATCH /api/v1/jobs/:id - Update a job
router.patch("/:id/deactivate", deactivateJob); // PATCH /api/v1/jobs/:id/deactivate - Deactivate a job
 
export default router;