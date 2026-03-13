import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const candidateSchema = new mongoose.Schema(
  {
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
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    // // Confirm Password Field
    // confirmPassword: {
    //   type: String,
    //   required: true,
    //   validate: {
    //     validator: function (value) {
    //       return value === this.password;
    //     },
    //     message: "Passwords does not match",
    //   },
    // },
    // Role
    role: {
      type: String,
      default: "candidate",
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  },
);

// Hash Password and Remove Confirm Password Before Saving
candidateSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcryptjs.hash(this.password, 12);
  this.confirmPassword = undefined;
});

// Compare Password Method
candidateSchema.methods.comparePassword = async function (
  candidatePassword,
  hashedPassword
) {
  return await bcryptjs.compare(candidatePassword, hashedPassword)
};

const Candidate = mongoose.model("Candidate", candidateSchema)

export default Candidate;
