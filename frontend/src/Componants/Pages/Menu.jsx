import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/plants`);
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex justify-center items-center px-4">
        <p className="text-xl sm:text-2xl">Loading plants...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-green-50 py-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary text-center mb-8 sm:mb-12">
          Our Green Collection
        </h1>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-10 sm:mb-16">
          Explore our wide variety of healthy, beautiful, and sustainable plants perfect for your home and garden.
        </p>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plants.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4 sm:p-6 flex flex-col items-center text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-32 sm:h-40 sm:w-40 object-cover rounded-full mb-4"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-primary">{product.name}</h3>
                <p className="text-sm sm:text-base text-gray-500 my-1">{product.category}</p>
                <p className="text-lg sm:text-xl font-bold text-secondary mt-2">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
