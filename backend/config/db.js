const mongoose = require("mongoose");
require("dotenv").config();

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 30000 });
    console.log("Connected to database");
  } catch (err) {
    console.error("Database Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
