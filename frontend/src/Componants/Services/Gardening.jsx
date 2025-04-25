import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCartRedux } from "../../Redux/cartSlice"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const GardeningEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(`http://13.203.120.9:5000/products?category=Gardening Equipment`);
        setEquipment(response.data)
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };
    fetchEquipment();
  }, []);

  const handleAddToCart = async (event, item) => {
    event.stopPropagation(); // Prevents Link navigation
    event.preventDefault(); // Stops default event

    const storedUser = JSON.parse(localStorage.getItem("user")) || {}; 
    const userId = user?._id || storedUser?._id;

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/cart/add",
        {
          userId,
          productId: item._id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${user.token || storedUser.token}` },
        }
      );

      if (response.status === 200) {
        dispatch(addToCartRedux({ ...item, quantity: 1 }));
        alert("Added to cart!");
      } else {
        alert("Failed to add to cart.");
      }
    } catch (error) {
      alert(" Error adding to cart.");
    }
  };

  return (
    <section className="min-h-screen bg-green-50 py-5 px-6 md:px-20 select-none cursor-default">
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
                  onClick={(event) => handleAddToCart(event, item)}
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
