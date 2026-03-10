import express from "express";
import { registerRecruiter, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Register recruiter
router.post("/recruiter/register", registerRecruiter);

// Login user
router.post("/login", loginUser);

export default router;

export const registerRecruiter = async (req, res) => {}

export const loginUser = async (req, res) => {}

