const Product = require('../models/Product');

exports.getProduct = async (req, res) => {
  const { barcode } = req.params;

  console.log(`🔍 Searching for barcode: '${barcode}' (Type: ${typeof barcode})`);

  try {
    // Convert barcode to string and trim any spaces
    const query = { barcode: barcode.toString().trim() };
    console.log(`🛠 Query being sent to MongoDB:`, query);

    const product = await Product.findOne(query);

    console.log('💾 Database result:', product);

    if (!product) {
      console.log('❌ Product not found in database.');
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('🚨 Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
