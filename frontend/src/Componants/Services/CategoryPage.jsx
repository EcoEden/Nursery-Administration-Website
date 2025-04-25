import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryPage = ({ title, endpoint }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get user from Redux

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}`);
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    };
    fetchProducts();
  }, [endpoint]);

  // Handle Add to Cart
  const handleAddToCart = async (e, product) => {
    e.stopPropagation(); // Prevent navigation to details page
    if (!user) {
      alert("Please login to add items to the cart.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/cart`, { productId: product._id, userId: user._id });
      alert(`${product.name} added to cart successfully!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Try again.");
    }
  };

  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-20 select-none cursor-default">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          {title}
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Discover our collection of {title.toLowerCase()}.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-40 object-cover rounded-full mb-4"
              />
              <h3 className="text-2xl font-semibold text-primary">{product.name}</h3>
              <p className="text-xl font-bold text-secondary mt-2">₹{product.price}</p>
              <button
                className="mt-4 bg-secondary hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
