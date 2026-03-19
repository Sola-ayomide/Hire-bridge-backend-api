import jwt from "jsonwebtoken";
import Recruiter from "../models/recruiter.model.js";
import Candidate from "../models/candidate.model.js";

// Middleware to protect routes and verify JWT token
export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

    // If no token, deny access
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Not authorized to access this route",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let currentUser;

        // Check if user is a recruiter or candidate
        if (decoded.role === "candidate") {
            currentUser = await Candidate.findById(decoded.id);
        } else if (decoded.role === "recruiter") {
            currentUser = await Recruiter.findById(decoded.id);
        }

        // if user no longer exist
        if (!currentUser) {
            return res.status(401).json({
                status: "error",
                message: "User not found",
            });
        }

        req.user = currentUser;
        req.role = decoded.role;

        next();
  }  catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Token is invalid or expired",
      error: error.message,                                  
    });
  }                                                           
};

// Middleware to restrict access to specific roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        console.log("Authorize check - req.role:", req.role);
        console.log("Authorize check - roles allowed:", roles);
        if (!roles.includes(req.role)) {
            return res.status(403).json({
                status: "error",
                message: "You do not have permission to perform this action",
            });
        }
        next();
    };
};