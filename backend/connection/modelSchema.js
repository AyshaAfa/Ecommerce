const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  category: String,
  image_id: String,
  price: String,
  oldPrice: String,
  discount: String,
  rating: String,
  reviews: String,
});

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  cartItems: [
    {
      productName: String,
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Product = mongoose.model("Product", productSchema, "Products");
const User = mongoose.model("User", userSchema);
const Order = mongoose.model('Order', orderSchema);


module.exports = { Product, User,Order };
