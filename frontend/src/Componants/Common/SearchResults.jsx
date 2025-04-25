import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = location.pathname.split('/search/')[1];
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      fetch(`http://13.201.26.192:5000/search/${encodeURIComponent(searchQuery)}`)
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
    <section className="min-h-50vh bg-green-50 py-16 px-6 md:px-20 select-none cursor-default">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          Search Results for: "{decodeURIComponent(searchQuery)}"
        </h1>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No products found.
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-40 object-cover rounded-full mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-primary">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-secondary mt-2">
                    ₹{product.price}
                  </p>
                  <button className="mt-4 bg-secondary hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition">
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
