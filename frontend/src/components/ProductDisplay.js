/* 
  It declares three state variables using the "useState" hook: "error", "totalCount", and "searchQuery". 
  It then uses the "useEffect" hook to fetch data from a local API endpoint and update the "totalCount" state variable 
  with the total count of products returned by the API. If an error occurs during the fetch, it updates the "error" state variable.

  The component renders a "Create Product" button that uses the "Link" component to navigate to a "new product" page, and a
  "Search" component that takes in the "searchQuery" state variable and a function to update it. It also renders a "ProductList"
  component that takes in the "searchQuery" and a function to be called when a product is deleted.
*/

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import ProductList from './ProductList';

function ProductDisplay() {
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/product`);
        const json = await response.json();
        setTotalCount(json.totalCount);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  function handleProductDeleted() {
    // Decrement the product count when a product is deleted
    setTotalCount((prevCount) => prevCount - 1);
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="mt-16">
          <h1 className="text-2xl md:text4xl font-bold tracking-tight text-gray-900 mb-4 md:mb-0">
            Products: Total {totalCount}
          </h1>
          <div className="max-w-xl py-5 rounded-md">
            <Link
              to="/product/new"
              className="grow bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded"
            >
              Create Product
            </Link>
          </div>
          <Search
            className="max-w-xl"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="md:col-span-4">
            <div class="h-screen overflow-y-auto">
              <ProductList
                searchQuery={searchQuery}
                onProductDeleted={handleProductDeleted}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDisplay;
