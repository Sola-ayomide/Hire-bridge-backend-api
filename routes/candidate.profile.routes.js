import express from "express";
import { createProfile, getMyProfile } from "../controllers/candidate.profile.controller.js";
import { updatePersonalDetails, updateContactInfo, updateProfessionalSummary } from "../controllers/candidate.basicInfo.controller.js";
import { addExperience, updateExperience, deleteExperience } from "../controllers/candidate.experience.controller.js";
import { addEducation, updateEducation, deleteEducation } from "../controllers/candidate.education.controller.js";
import { addSkill, deleteSkill, updateResume, updateVisibility, updateJobPreferences } from "../controllers/candidate.skills.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("candidate"));

// Profile
router.post("/", createProfile);
router.get("/me", getMyProfile);

// Basic Info
router.patch("/personal-details", updatePersonalDetails);
router.patch("/contact-info", updateContactInfo);
router.patch("/summary", updateProfessionalSummary);

// Experience
router.post("/experience", addExperience);
router.patch("/experience/:experienceId", updateExperience);
router.delete("/experience/:experienceId", deleteExperience);

// Education
router.post("/education", addEducation);
router.patch("/education/:educationId", updateEducation);
router.delete("/education/:educationId", deleteEducation);

// Skills
router.post("/skills", addSkill);
router.delete("/skills/:skill", deleteSkill);

// Resume, Visibility, Job Preferences
router.patch("/resume", updateResume);
router.patch("/visibility", updateVisibility);
router.patch("/job-preferences", updateJobPreferences);

export default router;