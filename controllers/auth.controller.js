import Recruiter from "../models/recruiter.model.js";
import Candidate from "../models/candidate.model.js";
import { sendWelcomeEmail } from "../utils/emailService.js";
import { calculateMatchScore } from "../services/matchingService.js";
import generateToken from "../utils/generate.token.js";


// Register a recruiter middleware/controller
export const registerRecruiter = async (req, res, next) => {
  try {
    // Destructuring
    const {
      firstName, lastName, country, state, phone, gender, jobTitle,
      business, website, industry, companySize, location, description,
      yearsInRecruitment, primaryHiringAreas, linkedinProfile,
      email, password,
    } = req.body;

    // Required fields validation
    if (!firstName || !lastName || !email || !password || !phone || !business || !industry || !location || !country || !state) {
      return res.status(400).json({
        success: false,
        message: "You are missing a required field!",
      });
    }

    // Check existing email
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create recruiter
    const recruiter = await Recruiter.create({
      firstName, lastName, country, state, phone, gender, jobTitle,
      business, website, industry, companySize, location, description,
      yearsInRecruitment, primaryHiringAreas, linkedinProfile,
      email, password,
      lastLogin: new Date().toISOString(),
    });

    // Generate token
    const token = generateToken(recruiter._id, "recruiter");

    // Send welcome email
    sendWelcomeEmail(recruiter.email, recruiter.business, recruiter.role);

    // Response
    res.status(201).json({
      success: true,
      message: "Recruiter registered successfully",
      token,
      data: {
        firstName: recruiter.firstName,
        lastName: recruiter.lastName,
        email: recruiter.email,
        business: recruiter.business,
        industry: recruiter.industry,
        role: recruiter.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Candidate Registration
export const registerCandidate = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate Required Fields
    if (!name || !email || !password ) {
      return res.status(400).json({
        status: "error",
        message: "You are missing a required field!",
      });
    }
    // Check if Candidate Already Exist
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({
        status: "error",
        message: "Email already registered",
      });
    }
    // Creating a New Candidate
    const newCandidate = await Candidate.create({
      name,
      email,
      password,
      lastLogin: new Date ().toISOString(), // sending last log in
    });

    // Generate JWT token using the new candidate's _id
    const token = generateToken(newCandidate._id, "candidate");

    // Remove password from the response
    newCandidate.password = undefined;

    // Sending welcome message to user's email
    sendWelcomeEmail(newCandidate.email, newCandidate.name, newCandidate.role);

    // Converting to object and removing sensitive data 
    const newCandidateRes = newCandidate.toObject();
    delete newCandidateRes._id;
    delete newCandidateRes.__v;

    // Sending Response
    res.status(201).json({
      status: "success",
      message: "Candidate registered successfully",
      data: {
        candidate: newCandidateRes,
      },
    });
  } catch (error) {
    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((el) => el.message);
      return res.status(400).json({
        status: "error",
        message: messages.join(". "),
      });
    }
    // Handle unexpected errors
    res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again later.",
    });

    // Logging error
    console.error("Register candidate error:", error);
  }
};

// Recruiter and Candidate Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide your email and password",
      });
    }

    // Check if user is a recruiter or candidate before login
    let user = await Candidate.findOne({ email }).select("+password");
    let role = "candidate";

    if (!user) {
      user = await Recruiter.findOne({ email }).select("+password");
      role = "recruiter";
    }

    // Check if candidate exists and password is correct
    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect email or password",
      });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    await user.save();

    // Generate Token
    const token = generateToken(user._id, user.role);

    // Remove password from the response
    user.password = undefined;
    user._id = undefined;
    user.__v = undefined;

    // Success response
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        user,
        // role,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    
    next(error);
  }
};

export const matchCandidateToJob = async (req, res) => {
  const candidateSkills = ["javascript", "nodejs", "mongodb"];
  const jobSkills = ["javascript", "nodejs", "python"];

  const result = calculateMatchScore(candidateSkills, jobSkills);

  res.json({
    matchScore: result.score,
    matchedSkills: result.matchedSkills,
  });
};