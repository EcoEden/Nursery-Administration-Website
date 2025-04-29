import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = location.pathname.split('/search/')[1];
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      fetch(`${import.meta.env.VITE_API_URL}/search/${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setFilteredProducts(data);
          } else {
            console.error('Unexpected data format:', data);
            setFilteredProducts([]);
          }
        })
        .catch((err) => {
          console.error('Error fetching products:', err);
          setFilteredProducts([]);
        });
    }
  }, [searchQuery]);

  return (
    <section className="bg-green-50 py-10 px-4 sm:px-6 md:px-10 lg:px-20 select-none cursor-default">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary text-center mb-10 sm:mb-14">
          Search Results for: "{decodeURIComponent(searchQuery)}"
        </h1>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-36 w-36 sm:h-40 sm:w-40 object-cover rounded-full mb-4"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">
                    {product.name}
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-secondary mt-1">
                    ₹{product.price}
                  </p>
                  <button className="mt-4 bg-secondary hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm sm:text-base transition">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
