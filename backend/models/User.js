const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true}, // Unique email
    password: { type: String, required: true },
    image: String,
    location: { type: String, required: true },
    role: { type: String, enum: ["user", "seller", "admin"], default: "user" }, // User role
  },
  { timestamps: true }
);

// ✅ Ensure unique email + role combination
// userSchema.index({ email: 1, role: 1 }, { unique: true });

// 🔒 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔐 Compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
