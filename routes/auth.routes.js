import express from "express";
import { registerRecruiter } from "../controllers/auth.controller.js";

const router = express.Router();

// POST /api/v1/auth/recruiter/register - to register recruiters
router.route('/recruiter/register').post(registerRecruiter);

export default router;