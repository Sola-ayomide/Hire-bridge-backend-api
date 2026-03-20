import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

// Getting stats
export const getDashboardStats = async (req, res, next) => {
  try {
    // Recruiter
    const recruiterId = req.user._id;

    // Active jobs
    const activeJobs = await Job.countDocuments({
      recruiter: recruiterId,
      status: "active"
    });

    // Total Applicants
    const totalApplicants = await Application.countDocuments({
      recruiter: recruiterId
    });

    // Shortlisted
    const shortlisted = await Application.countDocuments({
      recruiter: recruiterId,
      stage: "shortlisted"
    });

    // Sending response
    res.json({
      success: true,
      data: {
        activeJobs,
        totalApplicants,
        shortlisted
      }
    });

  } catch (error) {
    next(error);
  }
};

// Candidate Pipeline
export const getCandidatePipeline = async (req, res, next) => {
  try {
    // Recruiter
    const recruiterId = req.user._id;

    // Counting applications per stage for analytics
    const pipeline = await Application.aggregate([
      {
        $match: {
          recruiter: recruiterId
        }
      },
      {
        $group: {
          _id: "$stage",
          count: { $sum: 1 }
        }
      }
    ]);

    // Response
    res.json({
      success: true,
      data: pipeline
    });

  } catch (error) {
    next(error);
  }
};

// Recent Applicants' list
export const getRecentApplicants = async (req, res, next) => {
  try {

    const recruiterId = req.user._id;

    // Getting applicants and displaying in descending order with pagination 
    const applicants = await Application.find({
      recruiter: recruiterId
    })
    .populate("job", "title")
    .sort({ createdAt: -1 })
    .limit(5); // Pagination (5 applicants at once)

    // Sending response
    res.json({
      success: true,
      data: applicants
    });

  } catch (error) {
    next(error);
  }
};

