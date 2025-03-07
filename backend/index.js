const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const multer = require("multer");
const User = require("./models/User");
const UserProfile = require("./models/Profile");
const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, {
  serverSelectionTimeoutMS: 30000
})
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// const userSchema = mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, unique: true },
//   password: String,
//   conformPassword: String,
//   image: String
// });

// const userModel = mongoose.model("user", userSchema);

const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } });

// const ProductSchema = mongoose.Schema({
//   name: String,
//   category: String,
//   image: String,
//   price: String,
//   description: String,
// });

// const ProductModel = mongoose.model("products", ProductSchema);

// const ProductR = mongoose.model("product", new mongoose.Schema({
//   name: String,
//   price: String,
//   image: String,
//   category: String,
//   description: String
// }));

// const cartSchema = mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
//   quantity: { type: Number, default: 1 },
// });

// const CartModel = mongoose.model("cart", cartSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/signup", async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.send({ message: "Email ID is already registered", alert: false });
  } else {
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ message: "Successfully signed up", alert: true });
  }
});

app.post("/login", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const dataSend = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };
    res.send({ message: "Login is successful", alert: true, data: dataSend });
  } else {
    res.send({ message: "Email is not registered, please sign up", alert: false });
  }
});

// Route to fetch user details by ID
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await User.findById(userId).select('-password'); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post("/NewProduct", upload.single('image'), (req, res) => {
  const newProduct = new Product({
    ...req.body,
    image: req.file ? req.file.path : req.body.image
  });
  newProduct.save()
    .then(() => res.send({ message: "Product uploaded successfully" }))
    .catch(err => res.status(500).send({ message: "Error uploading product", error: err }));
});


app.get('/plants', async (req, res) => {
  const plants = await Product.find({});
  res.json(plants);
});

app.get('/decor-pots', async (req, res) => {
  const product = await Product.find({ category: 'Decor Pots' });
  res.json(product);
});

app.get('/indoor-plants', async (req, res) => {
  const product = await Product.find({ category: 'Indoor Plant' });
  res.json(product);
});

app.get('/outdoor-plants', async (req, res) => {
  const product = await Product.find({ category: 'Outdoor Plant' });
  res.json(product);
});

app.get('/herbs', async (req, res) => {
  const product = await Product.find({ category: 'Herbs' });
  res.json(product);
});

app.get('/gardening-equipment', async (req, res) => {
  const product = await Product.find({ category: 'Gardening Equipment' });
  res.json(product);
});

app.get('/plant-care-products', async (req, res) => {
  const product = await Product.find({ category: 'Plant Care Product' });
  res.json(product);
});

app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.json(product);
});


app.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });

    res.json(products); // Returns empty array if no matches.
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.listen(PORT, () => console.log(`Server is running on ${PORT}`));


