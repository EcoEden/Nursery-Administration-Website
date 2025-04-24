const nodemailer = require("nodemailer");

// In-memory OTP storage (you can also use DB)
const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS, // App password (not your real password)
  },
});

const sendOtpToGmail = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore.set(email, otp);
  setTimeout(() => otpStore.delete(email), 5 * 60 * 1000); // Expires in 5 mins

  await transporter.sendMail({
    from: `"Nursery Team" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your OTP for Nursery Sign Up",
    text: `Your OTP is: ${otp}`,
  });

  return otp;
};

const verifyOtp = (email, otp) => {
  return otpStore.get(email) === otp;
};

module.exports = { sendOtpToGmail, verifyOtp };
