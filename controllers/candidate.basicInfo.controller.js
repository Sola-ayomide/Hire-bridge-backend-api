import CandidateProfile from "../models/candidate.profile.model.js";
import calculateProfileCompletion from "../utils/calculateProfileCompletion.js";

// Update Personal Details
export const updatePersonalDetails = async (req, res, next) => {
  try {
    const { fullName, professionalHeadline, location, portfolioLink } = req.body;

    const updatedFields = {};
    if (fullName) updatedFields["basicInfo.fullName"] = fullName;
    if (professionalHeadline) updatedFields["basicInfo.professionalTitle"] = professionalHeadline;
    if (location) updatedFields["basicInfo.state"] = location;
    if (portfolioLink) updatedFields["resume.portfolioLink"] = portfolioLink;
    if (req.body.profilePhoto) {
      updatedFields["basicInfo.profilePhoto.url"] = req.body.profilePhoto.url;
      updatedFields["basicInfo.profilePhoto.publicId"] = req.body.profilePhoto.publicId;
    }

    const profile = await CandidateProfile.findOneAndUpdate(
      { candidate: req.user._id },
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Personal details updated successfully",
      profileCompletion: `${profile.profileCompletion}%`,
      data: {
        fullName: profile.basicInfo.fullName,
        professionalHeadline: profile.basicInfo.professionalTitle,
        location: profile.basicInfo.state,
        portfolioLink: profile.resume.portfolioLink,
        profilePhoto: profile.basicInfo.profilePhoto,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update Contact Info
export const updateContactInfo = async (req, res, next) => {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).json({
        status: "error",
        message: "Please provide at least one field to update",
      });
    }

    const updatedFields = {};
    if (email) updatedFields["basicInfo.email"] = email.toLowerCase().trim();
    if (phoneNumber) updatedFields["basicInfo.phoneNumber"] = phoneNumber;

    const profile = await CandidateProfile.findOneAndUpdate(
      { candidate: req.user._id },
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Contact information updated successfully",
      data: {
        email: profile.basicInfo.email,
        phoneNumber: profile.basicInfo.phoneNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update Professional Summary
export const updateProfessionalSummary = async (req, res, next) => {
  try {
    const { summary } = req.body;

    if (!summary) {
      return res.status(400).json({ status: "error", message: "Please provide a summary" });
    }

    const profile = await CandidateProfile.findOneAndUpdate(
      { candidate: req.user._id },
      { $set: { "basicInfo.professionalSummary": summary } },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ status: "error", message: "Profile not found" });
    }

    profile.profileCompletion = calculateProfileCompletion(profile);
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "Professional summary updated successfully",
      profileCompletion: `${profile.profileCompletion}%`,
      data: { professionalSummary: profile.basicInfo.professionalSummary },
    });
  } catch (error) {
    next(error);
  }
};