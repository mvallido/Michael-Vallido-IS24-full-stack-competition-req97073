/* 
  Renders a list of products fetched from an API.
  The useEffect hook is used to fetch the products from the API whenever any of the dependencies (pageNumber, pageSize, searchQuery) change.

  The component renders a list of ProductCard components, and each ProductCard has a onDelete callback which is used to delete the 
  product when the delete button is clicked. The component also renders a pagination component, which allows the user to navigate through 
  the pages of products. 
*/

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductList({ searchQuery, onProductDeleted }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  console.log(searchQuery);
  useEffect(() => {
    async function fetchData() {
      try {
        let url = 'http://localhost:3000/api/product';
        if (searchQuery) {
          url += `?search=${searchQuery}`;
        } else {
          url += `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        }
        const response = await fetch(url);
        const json = await response.json();
        setProducts(json.items);
        setTotalCount(json.totalCount);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, [pageNumber, pageSize, searchQuery]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  function handlePrevPage() {
    setPageNumber(Math.max(pageNumber - 1, 1));
  }

  function handleNextPage() {
    setPageNumber(Math.min(pageNumber + 1, totalPages));
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/product/${productId}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        onProductDeleted();
        const updatedProducts = products.filter(
          (product) => product.productId !== productId
        );
        setProducts(updatedProducts);
        setTotalCount(totalCount - 1);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <ProductCard
            key={item.productId}
            product={item}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {searchQuery ? null : (
        <div class="flex justify-center mt-4">
          <nav>
            <ul class="flex pagination ">
              {pageNumber !== 1 ? (
                <a
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  href="#"
                  onClick={handlePrevPage}
                >
                  Prev
                </a>
              ) : null}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li class="mx-2 page-item" key={page}>
                    <a
                      class={
                        page === pageNumber
                          ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                          : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }
                      href="#"
                      onClick={() => setPageNumber(page)}
                    >
                      {page}
                    </a>
                  </li>
                )
              )}
              {pageNumber !== totalPages ? (
                <a
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  href="#"
                  onClick={handleNextPage}
                >
                  Next
                </a>
              ) : null}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default ProductList;
