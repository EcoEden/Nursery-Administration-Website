const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/", authRoutes);
app.use("/",userRoutes)
app.use("/",sellerRoutes)
app.use("/",adminRoutes)
app.use("/products", productRoutes);


//  Start the Server
app.listen(PORT, () => console.log(` Server running on PORT ${PORT}`));
