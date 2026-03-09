// Importing packages
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const recruiterSchema = new mongoose.Schema({
    // Business Name field
    business: {
        type: String,
        required: true,
        trim: true,
    },

    // Industry field
    industry: {
        type: String,
        required: true,
    },

    // Phone Number field
    phone: {
        type: String,
        required: true,
        trim: true,
    },

    // Email field
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists'],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email']
    },

    // Location
    location: {
        type: String,
        required: true,
    },

    // Description
    description: {
        type: String,
        trim: true,
    },

    // Address
    address: {
        type: String,
        required: true,
        trim: true,
    },

    // Password field
    // password: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 8,
    //     select: false,
    // },

    // Role field
    role: {
        type: String,
        default: 'recruiter',
    },

    // Verified? field
    // isVerified: {
    //     type: Boolean,
    //     default: false,
    // },

    // Last login, verification token & expiry, reset password token and expiry fields
    lastLogin: Date,
    // verificationToken: String,
    // verificationTokenExpiresAt: Date, 
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    
},
{timestamps: true,});

// // Hash password before saving
// recruiterSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;

//   const salt = await bcryptjs.genSalt(10);
//   this.password = await bcryptjs.hash(this.password, salt);
// });

// // Compare password method
// recruiterSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcryptjs.compare(enteredPassword, this.password);
// };

// Creating Recruiter model
const Recruiter = mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;
