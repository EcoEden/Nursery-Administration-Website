import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GardeningEquipment = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/gardening-equipment');
        setEquipment(response.data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };
    fetchEquipment();
  }, []);

  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-20 select-none cursor-default">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          Gardening Equipment
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Essential tools to make your gardening easier and more effective.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item) => (
            <Link to={`/product/${item._id}`} key={item._id}>
              <div
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-40 object-cover rounded-full mb-4"
                />
                <h3 className="text-2xl font-semibold text-primary">{item.name}</h3>
                <p className="text-xl font-bold text-secondary mt-2">₹{item.price}</p>
                <button
                  className="mt-4 bg-secondary hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition"
                  onClick={(e) => e.preventDefault()} // Prevents button from triggering Link navigation
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GardeningEquipment;
