const express = require("express"); // Import express
const cors = require("cors"); // Import cors
const mongoose = require("mongoose"); // Import mongoose
const dotenv = require("dotenv").config(); // Access values from the .env file
const multer = require("multer"); // Import multer


const app = express(); // Create express app

app.use(cors()); // Use CORS

// Middleware for parsing JSON and URL-encoded data with larger limits
app.use(express.json({ limit: '50mb' })); // Set a larger limit for JSON
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Set a larger limit

// Port definition
const PORT = process.env.PORT || 5000; // Define the port

// MongoDB Connection
console.log(process.env.MONGODB_URL);
console.log(process.env.REACT_APP_API_URL);
mongoose.connect(process.env.MONGODB_URL, {
    serverSelectionTimeoutMS: 30000
})
    .then(() => console.log("Connected to database")) // Connect to the database
    .catch((err) => console.log(err)); // Log any connection errors

// User schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    conformPassword: String,
    image: String
});

// User model
const userModel = mongoose.model("user", userSchema);

// Multer setup for file uploads
const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB file size limit

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Sign up API
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body; // Access email from frontend
    const existingUser = await userModel.findOne({ email: email });

    // Check if email is available or not
    if (existingUser) {
        res.send({ message: "Email ID is already registered", alert: false });
    } else {
        const newUser = new userModel(req.body); // Create new user
        await newUser.save(); // Save the user
        res.send({ message: "Successfully signed up", alert: true });
    }
});

// Login API
app.post("/login", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (user) {
        const dataSend = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
        };
        console.log(dataSend);
        res.send({ message: "Login is successful", alert: true, data: dataSend });
    } else {
        res.send({ message: "Email is not registered, please sign up", alert: false });
    }
});

// Product schema
const ProductSchema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

// Product model
const ProductModel = mongoose.model("Product", ProductSchema);

// Save new product API
app.post("/uploadProduct", upload.single('image'), (req, res) => {
    console.log(req.body); // Log request body
    console.log(req.file); // Log the uploaded file
    const newProduct = new ProductModel({
        ...req.body,
        image: req.file.path // Save the image path if needed
    });
    newProduct.save()
        .then(() => res.send({ message: "Product uploaded successfully" }))
        .catch(err => res.status(500).send({ message: "Error uploading product", error: err }));
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
