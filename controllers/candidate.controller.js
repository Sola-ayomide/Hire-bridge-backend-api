import Candidate from "../models/candidate.model.js";
import { sendWelcomeEmail } from "../utils/emailService.js";

// Register a Candidate
const registerCandidate = async (req,res, next) {
    try{
        const {name, email, password, confirmPassword} = req.body;

        // Validate Required Fields
        if(!name || !email || !password || confirmPassword) {
            return res.status(400).json({
                status: "false",
                message: "You are missing a required field!",
            });
        }
        // Check if Candidate Already Exist
        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res.status(400).json({
                status: "false"
                message: "Email already registered"
            })
        }
        // Creating a New Candidate
         const newCandidate = await Candidate.create({
      name,
      email,
      password,
      confirmPassword,
    });
    newCandidate.password = undefined;

    // Sending welcome message to user's email
    sendWelcomeEmail(candidate.email, candidate.role);

    // Sending Response
     res.status(201).json({
      status: "success",
      message: "Candidate registered successfully",
      data: {
        candidate: newCandidate,
      },
    });
    } catch (error) {
    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((el) => el.message);
      return res.status(400).json({
        status: "fail",
        message: messages.join(". "),
      });
    }
    // Handle unexpected errors
    res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again later.",
    });
} 