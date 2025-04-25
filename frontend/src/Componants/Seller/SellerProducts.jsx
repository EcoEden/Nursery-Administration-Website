import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/seller-products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      await axios.delete(`${import.meta.env.VITE_API_URL}/seller-products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex justify-center items-center">
        <p className="text-2xl">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          Your Listed Products
        </h1>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-primary">{product.name}</h3>
              <p className="text-lg text-gray-500 my-1">{product.category}</p>
              <p className="text-xl font-bold text-secondary mt-2">₹{product.price}</p>
              <p className="text-gray-700 text-base mt-3">{product.description}</p>

              {/* Edit & Delete Buttons */}
              <div className="mt-5 flex gap-4">
                <Link
                  to={`/edit-product/${product._id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-lg font-medium transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-lg font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellerProducts;
