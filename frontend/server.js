const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/ecommerce1');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const userModel = mongoose.model('users', userSchema);

app.use(express.json());
app.use(cors());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/test', (req, res) => {
  userModel.find({})
    .then(function(users) {
      res.json(users);
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
