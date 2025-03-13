import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    setProduct(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/products/${barcode}`);
      setProduct(response.data);
    } catch (err) {
      setError('Product not found. Please try another barcode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>GreenCart - Sustainable Shopping</h1>
      <p>Scan or enter a barcode to check product sustainability.</p>

      <input
        type="text"
        placeholder="Enter barcode..."
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button onClick={fetchProduct} disabled={loading || !barcode.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="error">{error}</p>}

      {product && (
        <div className="product-card">
          <h2>{product.name}</h2>
          <p><strong>Barcode:</strong> {product.barcode}</p>
          <p><strong>Sustainability Score:</strong> {product.sustainabilityScore} / 100</p>
        </div>
      )}
    </div>
  );
}

export default App;
