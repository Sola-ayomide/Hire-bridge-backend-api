import mongoose from "mongoose";
import bcrypt from "bycryptjs";

const candidateSchema = new mongoose.Schema({
    // Candidate Name Field
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    // Email Field
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    // Password Field
password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [8, "Password must be at least 8 characters long"]
    select: false,
},
// Confirm Password Field
confirmPassword: {
    type: String,
    required: true,
    validate: {
        validator: function(value) {
            return value === this.password;
        },
        message: "Passwords does not match",
    },
},
// Role
 role: {
        type: String,
        default: 'candidate',
    },
},
{
    timestamps: true,
});

// Hash Password and Remove Confirm Password Before Saving
candidateSchema.pre(save, async function (next) {
    if (!this.isModified("password"))
        return (next);

    this.password = await bycrpt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

// Compare Password Method
candidateSchema.methods.comparePassword = async function (
    candidatePassword,
    hashedPassword
) {
    await bcrypt.compare(candidatePassword, hashedPassword)
};

const Candidate = mongoose.model("Candidate", candidateSchema)

export default Candidate;
