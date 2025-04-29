import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCartRedux } from "../../Redux/cartSlice";
import { useNavigate, Link } from "react-router-dom";
// Optional: Toasts
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const PlantCareProducts = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?category=Plant Care Product`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching plant care products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (event, product) => {
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
        { userId, productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        dispatch(addToCartRedux({ ...product, quantity: 1 }));
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
          Plant Care Products
        </h1>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-12">
          Keep your plants healthy with our curated care products.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center cursor-pointer h-full">
                <img
                  src={product.image || "/default-plant.jpg"}
                  alt={product.name}
                  className="h-40 w-40 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-primary">{product.name}</h3>
                <p className="text-lg font-bold text-green-600 mt-2">₹{product.price}</p>

                <button
                  onClick={(event) => handleAddToCart(event, product)}
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

export default PlantCareProducts;
