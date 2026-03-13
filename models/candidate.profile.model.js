import mongoose from "mongoose";

// Reference to candidate auth account
const candidateProfileSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        required: true,
        unique: true,
    },

    // Basic Information
    basicInfo: {
        fullName: {
            type: String,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
        },
        country: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        professionalTitle: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["male", "female", "non-binary", "prefer not to say"],
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: trim,
            lowercase: true,
        },
        professionalSummary: {
            type: String,
            maxlength: [1000, "Professional summary cannot exceed 1000 characters"],
        },
        profilePhoto: {
            url: { type: String },
            publicId: { type: String },
        },
    },

    // Experience
    experience: [
        {
        title: {
            type: String,
            trim: true,
        },
        employmentType: {
            type: String,
            enum: [
                "full-time",
                "part-time",
                "contract",
                "internship",
                "freelance",
                "volunteer",
            ],
        },
        company: {
            type: String,
            trim: true,
        },
        currentlyWorking: {
            type: Boolean,
            default: false,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        location: {
            type: String,
            trim: true,
        },
        locationType: {
            type: String,
            enum: ["on-site", "remote", "hybrid"],
        },
    },
],

// Education
education: [
    {
        school: {
            type: String,
            trim: true,
        },
        degree: {
            type: String,
            enum: [
                "first class honours",
                "second class upper honours",
                "second class lower honours",
                "third class honours",
                "pass",
            ],
        },
        fieldOfStudy: {
            type: String,
            trim: true,
        },
        grade: {
            type: String,
            trim: true,
        },
         startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        certificate: {
            url: { type: String},
            publicId: { type: String},
        },
    },
],

// Skills
skills: [
    {
        type: String,
        trim: true,
    },
],

// Resume
resume: {
    file: {
        url: { type: String},
        publicId: { type: String},
    },
    portfolioLink: {
        type: String,
        trim: true,
    },
    linkedinProfile: {
        type: String,
        trim: true,
    },
    personalWebsite: {
        type: String,
        trim: true,
    },
},

// Profile Visibility
visibility: {
    openToWork: {
        type: Boolean,
        default: false,
    },
    visibleToRecruiters: {
       type: Boolean,
       default: true,
    },
    privateAccount: {
        type: Boolean,
        default: false,
    },
},

// Job Preferences
jobPreferences: {
    desiredJobRole: {
        type: String,
        trim: true,
    },
    preferredLocation: {
        type: String,
        enum: [
            "Lagos",
            "Abuja",
            "Port-harcourt",
            "Ogun",
            "Ibadan",
        ],
    },
    preferredWorkType: {
        type: String,
        enum: ["remote", "on-site", "hybrid"],
    },
    employmentType: {
        type: String,
        enum: ["full-time", "part-time", "contract", "internship", "freelance"],
    },
    expectedSalaryRange: {
        type: String,
        enum: [
            "$0 - $1,000",
            "$1,000 - $2,000",
            "$2,000 - $3,000",
            "$3,000 - $5,000",
            "$5,000+",
        ],
    },
    availability: {
        type: String,
        enum: [
          "immediately",
          "within 1 week",
          "within 2 weeks",
          "within 1 month",
          "not available",
        ],
      },
},

// Profile Completion
profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
},
},
{
    timestamps: true,
},
)

const candidateProfile = mongoose.model("CandidateProfile", candidateProfileSchema);

export default candidateProfile