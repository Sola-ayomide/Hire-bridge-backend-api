import CandidateProfile from "../models/candidate.profile.model.js";
import calculateProfileCompletion from "../utils/calculateProfileCompletion.js";

// Create Profile
export const createProfile = async (req, res, next) => {
  try {
    const existingProfile = await CandidateProfile.findOne({
      candidate: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        status: "error",
        message: "Profile already exists.",
      });
    }

    const profile = await CandidateProfile.create({
      candidate: req.user._id,
      ...req.body,
    });

    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(201).json({
      status: "success",
      message: "Profile created successfully",
      profileCompletion: `${profile.profileCompletion}%`,
      data: { profile },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((el) => el.message);
      return res.status(400).json({
        status: "error",
        message: messages.join(". "),
      });
    }
    next(error);
  }
};

// Get My Profile
export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOne({
      candidate: req.user._id,
    }).populate("candidate", "name email");

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found. Please create your profile.",
      });
    }

    res.status(200).json({
      status: "success",
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
};