import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCartRedux } from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const IndoorPlants = () => {
  const [indoorPlants, setIndoorPlants] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIndoorPlants = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products?category=Indoor Plant`);
        setIndoorPlants(response.data);
      } catch (error) {
        console.error("Error fetching indoor plants:", error);
      }
    };
    fetchIndoorPlants();
  }, []);

  const handleAddToCart = async (event, plant) => {
    event.stopPropagation(); 
    event.preventDefault(); 

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userId = user?._id || storedUser?._id;

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        { userId, productId: plant._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${user.token || storedUser.token}` } }
      );

      if (response.status === 200) {
        dispatch(addToCartRedux({ ...plant, quantity: 1 }));
        alert(" Added to cart!");
      } else {
        alert(" Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart.");
    }
  };

  return (
    <section className="min-h-screen bg-green-50 py-5 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          Indoor Plants
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Enhance your indoor spaces with fresh greenery.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {indoorPlants.map((plant) => (
            <Link to={`/product/${plant._id}`} key={plant._id}>
            <div
              key={plant._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center cursor-pointer"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="h-40 w-40 object-cover rounded-full mb-4"
              />
              <h3 className="text-2xl font-semibold text-primary">{plant.name}</h3>
              <p className="text-xl font-bold text-secondary mt-2">₹{plant.price}</p>

              <button
                onClick={(event) => handleAddToCart(event, plant)}
                className="mt-3 px-4 py-2 bg-secondary hover:bg-green-700 text-white rounded-lg"
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

export default IndoorPlants;
