import CandidateProfile from "../models/candidate.profile.model.js";
import calculateProfileCompletion from "../utils/calculateProfileCompletion.js";

// Add Skill
export const addSkill = async (req, res, next) => {
  try {
    const { skill } = req.body;

    if (!skill) {
      return res.status(400).json({ status: "error", message: "Please provide a skill" });
    }

    const profile = await CandidateProfile.findOne({ candidate: req.user._id });

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    const skillExists = profile.skills.some(
      (s) => s.toLowerCase() === skill.toLowerCase()
    );

    if (skillExists) {
      return res.status(400).json({
        status: "error",
        message: `"${skill}" is already in your skills list`,
      });
    }

    profile.skills.push(skill.trim());
    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: `"${skill}" added to your skills`,
      profileCompletion: `${profile.profileCompletion}%`,
      data: { skills: profile.skills },
    });
  } catch (error) {
    next(error);
  }
};

// Delete Skill
export const deleteSkill = async (req, res, next) => {
  try {
    const { skill } = req.params;

    const profile = await CandidateProfile.findOne({ candidate: req.user._id });

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    const skillExists = profile.skills.some(
      (s) => s.toLowerCase() === skill.toLowerCase()
    );

    if (!skillExists) {
      return res.status(404).json({
        status: "error",
        message: `"${skill}" was not found in your skills list`,
      });
    }

    profile.skills = profile.skills.filter(
      (s) => s.toLowerCase() !== skill.toLowerCase()
    );

    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: `"${skill}" removed from your skills`,
      profileCompletion: `${profile.profileCompletion}%`,
      data: { skills: profile.skills },
    });
  } catch (error) {
    next(error);
  }
};

// Update Resume
export const updateResume = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOneAndUpdate(
      { candidate: req.user._id },
      { resume: req.body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Resume updated successfully",
      profileCompletion: `${profile.profileCompletion}%`,
      data: { resume: profile.resume },
    });
  } catch (error) {
    next(error);
  }
};

// Update Visibility
export const updateVisibility = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOneAndUpdate(
      { candidate: req.user._id },
      { visibility: req.body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Visibility settings updated successfully",
      data: { visibility: profile.visibility },
    });
  } catch (error) {
    next(error);
  }
};

// Update Job Preferences
export const updateJobPreferences = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOneAndUpdate(
      { candidate: req.user._id },
      { jobPreferences: req.body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Job preferences updated successfully",
      profileCompletion: `${profile.profileCompletion}%`,
      data: { jobPreferences: profile.jobPreferences },
    });
  } catch (error) {
    next(error);
  }
};