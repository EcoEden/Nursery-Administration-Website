import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCartRedux } from "../../Redux/cartSlice"; 
import { Link, useNavigate } from 'react-router-dom';

const DecorPots = () => {
  const [decorPots, setDecorPots] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecorPots = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products?category=Decor Pots");
        setDecorPots(response.data);
      } catch (error) {
        console.error("Error fetching decor pots:", error);
      }
    };
    fetchDecorPots();
  }, []);

  const handleAddToCart = async (event, pot) => {
    event.stopPropagation(); 
    const storedUser = JSON.parse(localStorage.getItem("user")) || {}; 
    const userId = user?._id || storedUser?._id; 

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/cart/add",
        {
          userId,
          productId: pot._id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${user.token || storedUser.token}` },
        }
      );

      if (response.status === 200) {
        dispatch(addToCartRedux({ ...pot, quantity: 1 }));
        alert("Added to cart!");
      } else {
        alert("Failed to add to cart.");
      }
    } catch (error) {
      alert("Error adding to cart.");
    }
  };

  return (
    <section className="min-h-screen bg-green-50 py-5 px-16 md:px-20 select-none cursor-default">
      <div className="max-w-6xl mx-auto max-h-5xl">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          Decor Pots
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Beautiful pots to complement your plants and decor.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {decorPots.map((pot) => (
            <Link to={`/product/${pot._id}`} key={pot._id}>
              <div
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center cursor-pointer"
              >
                <img
                  src={pot.image}
                  alt={pot.name}
                  className="h-40 w-40 object-cover rounded-full mb-4"
                />
                <h3 className="text-2xl font-semibold text-primary">{pot.name}</h3>
                <p className="text-xl font-bold text-secondary mt-2">₹{pot.price}</p>
                
                <button
                  onClick={(event) => handleAddToCart(event, pot)}
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

export default DecorPots;
