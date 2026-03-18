import CandidateProfile from "../models/candidate.profile.model.js";
import calculateProfileCompletion from "../utils/calculateProfileCompletion.js";

// Add Education
export const addEducation = async (req, res, next) => {
  try {
    const { degree, school } = req.body;

    if (!degree || !school) {
      return res.status(400).json({
        status: "error",
        message: "Degree and institution are required",
      });
    }

    const profile = await CandidateProfile.findOne({ candidate: req.user._id });

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    profile.education.push(req.body);
    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Education added successfully",
      profileCompletion: `${profile.profileCompletion}%`,
      data: { education: profile.education },
    });
  } catch (error) {
    next(error);
  }
};

// Update Education
export const updateEducation = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOne({ candidate: req.user._id });

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    const education = profile.education.id(req.params.educationId);

    if (!education) {
      return res.status(404).json({ status: "error", message: "Education not found" });
    }

    Object.assign(education, req.body);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Education updated successfully",
      data: { education: profile.education },
    });
  } catch (error) {
    next(error);
  }
};

// Delete Education
export const deleteEducation = async (req, res, next) => {
  try {
    const profile = await CandidateProfile.findOne({ candidate: req.user._id });

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    const education = profile.education.id(req.params.educationId);
    if (!education) {
      return res.status(404).json({ status: "error", message: "Education not found" });
    }

    profile.education.pull({ _id: req.params.educationId });
    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Education deleted successfully",
      data: { education: profile.education },
    });
  } catch (error) {
    next(error);
  }
};