import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCartRedux } from "../../Redux/cartSlice";
import { useNavigate, Link } from "react-router-dom";
// Optional: Toasts
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const OutdoorPlants = () => {
  const [outdoorPlants, setOutdoorPlants] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOutdoorPlants = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?category=Outdoor Plant`
        );
        setOutdoorPlants(response.data);
      } catch (error) {
        console.error("Error fetching outdoor plants:", error);
      }
    };
    fetchOutdoorPlants();
  }, []);

  const handleAddToCart = async (event, plant) => {
    event.stopPropagation();
    event.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userId = user?._id || storedUser?._id;
    const token = user?.token || storedUser?.token;

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        { userId, productId: plant._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        dispatch(addToCartRedux({ ...plant, quantity: 1 }));
        // toast.success("Added to cart!");
        alert("Added to cart!");
      } else {
        // toast.error("Failed to add to cart.");
        alert("Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // toast.error("Error adding to cart.");
      alert("Error adding to cart.");
    }
  };

  return (
    <section className="min-h-screen bg-green-50 py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-secondary text-center mb-6">
          Outdoor Plants
        </h1>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-12">
          Bring nature to your outdoor spaces with our selection of plants.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {outdoorPlants.map((plant) => (
            <Link to={`/product/${plant._id}`} key={plant._id}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center cursor-pointer h-full">
                <img
                  src={plant.image || "/default-plant.jpg"}
                  alt={plant.name}
                  className="h-40 w-40 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-primary">{plant.name}</h3>
                <p className="text-lg font-bold text-green-600 mt-2">₹{plant.price}</p>

                <button
                  onClick={(event) => handleAddToCart(event, plant)}
                  className="mt-4 px-5 py-2 text-sm sm:text-base bg-secondary hover:bg-green-700 text-white rounded-lg transition-all"
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

export default OutdoorPlants;
