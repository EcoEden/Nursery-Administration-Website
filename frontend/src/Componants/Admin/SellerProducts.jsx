import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerProduct = () => {
  const { sellerId } = useParams(); // Get sellerId from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
//   const token = useSelector((state) => state.auth.token); // Use Redux token

useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      console.log("Fetching products for seller:", sellerId); // Debugging log

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/sellers/${sellerId}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId]);

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-2xl font-semibold text-gray-700">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="min-h-[50vh] bg-green-50 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-center mb-6 text-gray-700">
          <img src="../../main_page_img/Product.png" alt="Products" className="w-10 h-10 mr-3" />
          <h1 className="text-4xl font-bold text-secondary">Seller's Products</h1>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No products added by this seller yet.</p>
        ) : (
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
                      <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg border" />
                    </td>
                    <td className="p-4 text-gray-800 font-medium">{product.name}</td>
                    <td className="p-4 text-gray-600">{product.category}</td>
                    <td className="p-4 text-gray-800 font-semibold">₹{product.price}</td>
                    <td className="p-4 flex space-x-2">
                    
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-3 py-2 mt-4 rounded-lg text-sm hover:bg-green-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default SellerProduct;
