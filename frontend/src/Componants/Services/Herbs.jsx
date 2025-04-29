import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCartRedux } from "../../Redux/cartSlice";
import { useNavigate, Link } from "react-router-dom";

const Herbs = () => {
  const [herbs, setHerbs] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHerbs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?category=Herbs`
        );
        setHerbs(response.data);
      } catch (error) {
        console.error("Error fetching herbs:", error);
      }
    };
    fetchHerbs();
  }, []);

  const handleAddToCart = async (event, herb) => {
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
        {
          userId,
          productId: herb._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token || storedUser.token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(addToCartRedux({ ...herb, quantity: 1 }));
        alert("Added to cart!");
      } else {
        alert("Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart.");
    }
  };

  return (
    <section className="min-h-screen bg-green-50 py-5 px-4 sm:px-8 lg:px-20 select-none">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary text-center mb-8">
          Herbs
        </h1>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-10">
          Fresh herbs to enhance your culinary creations and well-being.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {herbs.map((herb) => (
            <Link to={`/product/${herb._id}`} key={herb._id}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center text-center">
                <img
                  src={herb.image}
                  alt={herb.name}
                  className="h-32 w-32 sm:h-36 sm:w-36 object-cover rounded-full mb-3"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-primary">
                  {herb.name}
                </h3>
                <p className="text-lg font-bold text-green-600 mt-2">
                  ₹{herb.price}
                </p>

                <button
                  onClick={(event) => handleAddToCart(event, herb)}
                  className="mt-4 bg-secondary hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm sm:text-base"
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

export default Herbs;
