const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");  
const { Product, User, Order } = require("../connection/modelSchema");  
const connectDB = require("../connection/connect");

const app = express();
app.use(cors());
app.use(express.json());

console.log("Server is starting...");

connectDB();
console.log("Attempting to connect to MongoDB...");


app.get("/products", async (req, res) => {
  try {
    console.log("Fetching all products...");
    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'category',
          localField: 'category_id',
          foreignField: 'category_id',
          as: 'categoryDetails',
        },
      },
      {
        $lookup: {
          from: 'images',
          localField: 'image_id',
          foreignField: 'image_id',
          as: 'imageDetails',
        },
      },
      {
        $project: {
          name: 1,
          category_id: 1,
          image_id: 1,
          price: 1,
          oldPrice: 1,
          discount: 1,
          rating: 1,
          reviews: 1,
          'categoryDetails.category_name': 1,
          'imageDetails.url': 1,
        }
      }
    ]);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

app.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    
    const products = await Product.find({ name: { $regex: query, $options: 'i' } });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "No products found matching your search" });
    }
  } catch (error) {
    console.error("Error during product search:", error);
    res.status(500).json({ message: "Server error during search" });
  }
});


app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during registration" });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});


app.post("/create-order", async (req, res) => {
  const { name, address, phone, paymentMethod, cartItems, totalPrice } = req.body;

  try {
    const newOrder = new Order({
      name,
      address,
      phone,
      paymentMethod,
      cartItems,
      totalPrice
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
