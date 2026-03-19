import express from "express";
import { applyForJob } from "../controllers/application.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// POST /api/v1/applications/:jobId/apply - Candidate applies for a job
router.post(
    "/applications/:jobId/apply",
    protect,
    authorize("candidate"),
    upload.single("resume"),
    applyForJob
);

export default router;