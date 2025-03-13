const mongoose = require('mongoose');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/greencart', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product data
const newProduct = new Product({
  name: 'Cadbury Shots',
  barcode: '7622201448837',
  sustainabilityScore: 75, // Example score
});

// Insert product into the database
newProduct.save()
  .then(() => {
    console.log('Product added successfully!');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error adding product:', err));

