import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/product');
        const json = await response.json();
        setProducts(json);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world
      </h1>
      {products ? (
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              {product.productName} - {product.productOwnerName}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}
    </>

  );
}

export default App;
