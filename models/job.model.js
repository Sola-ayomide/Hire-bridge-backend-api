import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requiredSkills: {
      type: [String],
    },

    salary: {
      type: Number,
    },

    experienceLevel: {
      type: String,
      enum: ["junior", "mid-level", "senior"],
      required: true,
    },

    // New fields
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "hybrid", "contract"],
    },

    department: {
      type: String,
    },

    minimumQualifications: {
      type: [String],
    },

    preferredQualifications: {
      type: [String],
    },

    views: {
      type: Number,
      default: 0,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);

export default Job;