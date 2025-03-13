const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  barcode: String,
  sustainabilityScore: Number,
});

module.exports = mongoose.model('Product', ProductSchema);

