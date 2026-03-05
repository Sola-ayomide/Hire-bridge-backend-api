import Recruiter from "../models/recruiter.model.js";

// Register a recruiter middleware/controller
export const registerRecruiter = async (req, res, next) => {
    try {
        // Destructuring entries from req.body
        const {
            firstName,
            otherName,
            lastName,
            email,
            password
        } = req.body;

        // Validating required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "First name, last name, email and password are required"
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
            firstName,
            otherName,
            lastName,
            email,
            password,
        });

        // Sending response 
        res.status(201).json({
            success: true,
            message: "Recruiter registered successfully",
            data: {
                id: recruiter._id,
                firstName: recruiter.firstName,
                otherName: recruiter.otherName,
                lastName: recruiter.lastName,
                email: recruiter.email,
                role: recruiter.role,
                isVerified: recruiter.isVerified
            }
        });

    } catch (error) {
        next(error);
    }
};