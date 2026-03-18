import CandidateProfile from "../models/candidate.profile.model.js";
import calculateProfileCompletion from "../utils/calculateProfileCompletion.js";

// Add Experience
export const addExperience = async (req, res, next) => {
  try {
    const { title, employmentType, company, startDate } = req.body;

    if (!title || !employmentType || !company || !startDate) {
      return res.status(400).json({
        status: "error",
        message: "Title, employment type, company and start date are required",
      });
    }

    if (req.body.currentlyWorking && req.body.endDate) {
      return res.status(400).json({
        status: "error",
        message: "End date should not be provided if currently working in this role",
      });
    }

    const profile = await CandidateProfile.findOne({ candidate: req.user._id });

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    profile.experience.push({
      ...req.body,
      endDate: req.body.currentlyWorking ? null : req.body.endDate,
    });

    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Experience added successfully",
      profileCompletion: `${profile.profileCompletion}%`,
      data: { experience: profile.experience },
    });
  } catch (error) {
    next(error);
  }
};

// Update Experience
export const updateExperience = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOne({ candidate: req.user._id });

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    const experience = profile.experience.id(req.params.experienceId);

    if (!experience) {
      return res.status(404).json({ status: "error", message: "Experience not found" });
    }

    if (req.body.currentlyWorking === true) req.body.endDate = null;

    Object.assign(experience, req.body);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Experience updated successfully",
      data: { experience: profile.experience },
    });
  } catch (error) {
    next(error);
  }
};

// Delete Experience
export const deleteExperience = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOne({ candidate: req.user._id });

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    const experience = profile.experience.id(req.params.experienceId);
    if (!experience) {
      return res.status(404).json({ status: "error", message: "Experience not found" });
    }

    profile.experience.pull({ _id: req.params.experienceId });
    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Experience deleted successfully",
      data: { experience: profile.experience },
    });
  } catch (error) {
    next(error);
  }
};