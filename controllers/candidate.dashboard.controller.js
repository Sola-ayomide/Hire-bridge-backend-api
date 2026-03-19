import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import CandidateProfile from "../models/candidate.profile.model.js";
import { calculateMatchScore } from "../services/matchingService.js";

// Stats — applications sent, shortlisted, interviews scheduled
export const getCandidateDashboardStats = async (req, res, next) => {
  try {
    const candidateEmail = req.user.email;

    const applicationsSent = await Application.countDocuments({
      email: candidateEmail,
    });

    const shortlisted = await Application.countDocuments({
      email: candidateEmail,
      stage: "shortlisted",
    });

    const interviewsScheduled = await Application.countDocuments({
      email: candidateEmail,
      stage: "interview",
    });

    res.status(200).json({
      status: "success",
      data: {
        applicationsSent,
        shortlisted,
        interviewsScheduled,
      },
    });
  } catch (error) {
    next(error);
  }
};

// My Applications — most recent 5
export const getMyApplications = async (req, res, next) => {
  try {
    const candidateEmail = req.user.email;

    const applications = await Application.find({ email: candidateEmail })
      .populate("job", "title company location")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      status: "success",
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// Recommended Jobs — matched against candidate's skills
export const getRecommendedJobs = async (req, res, next) => {
  try {
    // Get candidate's skills from their profile
    const profile = await CandidateProfile.findOne({
      candidate: req.user._id,
    });

    if (!profile || profile.skills.length === 0) {
      return res.status(200).json({
        status: "success",
        message:
          "Complete your profile and add skills to get job recommendations",
        data: [],
      });
    }

    // Get all active jobs
    const jobs = await Job.find({ status: "active" });

    // Score each job against candidate's skills
    const scoredJobs = jobs
      .map((job) => {
        const result = calculateMatchScore(profile.skills, job.requiredSkills);
        return {
          job,
          score: result.score,
          matchedSkills: result.matchedSkills,
        };
      })
      .filter((item) => item.score >= 30) // only show if at least 30% match
      .sort((a, b) => b.score - a.score) // highest match first
      .slice(0, 5); // top 5 only

    res.status(200).json({
      status: "success",
      data: scoredJobs.map((item) => ({
        _id: item.job._id,
        title: item.job.title,
        company: item.job.company,
        location: item.job.location,
        experienceLevel: item.job.experienceLevel,
        requiredSkills: item.job.requiredSkills,
        matchScore: item.score,
        matchedSkills: item.matchedSkills,
        createdAt: item.job.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};

// Profile completion percentage
export const getProfileCompletion = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOne({
      candidate: req.user._id,
    });

    if (!profile) {
      return res.status(200).json({
        status: "success",
        data: { profileCompletion: 0 },
      });
    }

    res.status(200).json({
      status: "success",
      data: { profileCompletion: profile.profileCompletion },
    });
  } catch (error) {
    next(error);
  }
};