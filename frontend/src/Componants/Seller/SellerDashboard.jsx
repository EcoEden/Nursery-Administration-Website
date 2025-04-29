import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerDashboard = () => {
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
        toast.error("You must be logged in to delete a product.", { autoClose: 2000 });
        return;
      }

      await axios.delete(`${import.meta.env.VITE_API_URL}/seller-products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product deleted successfully!", { autoClose: 2000 });
      
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      toast.error("Failed to delete product. Try again.", { autoClose: 2000 });
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-2xl font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="min-h-[65vh] bg-green-50 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-center mb-6 text-gray-700">
          <img src="./main_page_img/dashboard.png" alt="Seller Dashboard" className="w-10 h-10 mr-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary">Seller Dashboard</h1>
        </div>

        <div className="flex justify-end mb-4">
          <Link
            to="/new-product"
            className="bg-secondary text-white px-4 py-2 rounded-lg text-lg hover:bg-green-700"
          >
            + Add New Product
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-lg">
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Product Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 text-gray-800 font-medium">{product.name}</td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4 text-gray-800 font-semibold">₹{product.price}</td>
                  <td className="p-4 flex flex-wrap justify-start md:justify-start space-x-2">
                    <Link
                      to={`/edit-product/${product._id}`}
                      className="bg-secondary text-white px-3 py-2 mt-3 rounded-lg text-sm hover:bg-green-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-2 mt-3 rounded-lg text-sm hover:bg-green-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SellerDashboard;
