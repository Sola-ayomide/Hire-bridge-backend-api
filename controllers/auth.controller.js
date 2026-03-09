import Recruiter from "../models/recruiter.model.js";
import { sendWelcomeEmail } from "../utils/emailService.js";

// Register a recruiter middleware/controller
export const registerRecruiter = async (req, res, next) => {
    try {
        // Destructuring entries from req.body
        const {
            business,
            industry,
            phone,
            email,
            location,
            address,
            ...otherFields
        } = req.body;

        // Validating required fields
        if (!business || !industry || !phone || !email || !location || !address) {
            return res.status(400).json({
                success: false,
                message: "You are missing a required field!"
            });
        }

        // Checking if email already exists
        const existingRecruiter = await Recruiter.findOne({ email });

        if (existingRecruiter) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Creating a new recruiter
        const recruiter = await Recruiter.create({
            business,
            industry,
            phone,
            email,
            location,
            address,
            ...otherFields,
            lastLogin: new Date().toISOString(), 
        });

        // Sending welcome message to user's email
        sendWelcomeEmail(recruiter.email, recruiter.business, recruiter.role);

        // Sending response 
        res.status(201).json({
            success: true,
            message: "Recruiter registered successfully",
            data: {
                business: recruiter.business,
                industry: recruiter.industry,
                phone: recruiter.phone,
                email: recruiter.email,
                location: recruiter.location,
                address: recruiter.address,
                role: recruiter.role,
            }
        });

    } catch (error) {
        next(error);
    }
};