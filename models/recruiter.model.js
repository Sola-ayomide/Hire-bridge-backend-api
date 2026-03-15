import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const recruiterSchema = new mongoose.Schema({
    // Personal Information
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["male", "female"] },
    jobTitle: { type: String },

    // Company Information
    business: { type: String, required: true, trim: true },
    website: { type: String, trim: true },
    industry: { type: String, required: true },
    companySize: { type: String },
    location: { type: String, required: true },
    description: { type: String, trim: true },

    // Recruitment Experience
    yearsInRecruitment: { type: String },
    primaryHiringAreas: { type: [String], default: [] },
    linkedinProfile: { type: String, trim: true },

    // Auth
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        select: false,
    },
    role: { type: String, default: 'recruiter' },
    lastLogin: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
},
{ timestamps: true });

recruiterSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

recruiterSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;