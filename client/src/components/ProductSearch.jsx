import { useState } from 'react';
import axios from 'axios';

function ProductSearch() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const fetchProduct = async () => {
    setError('');
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${barcode}`);
      setProduct(res.data);
    } catch (err) {
      setProduct(null);
      setError('Product not found or error fetching data');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button onClick={fetchProduct}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>Sustainability Score: {product.sustainabilityScore}</p>
        </div>
      )}
    </div>
  );
}

export default ProductSearch;
