import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrders = () => {
  const { userId } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Unauthorized. Please log in.");
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users/${userId}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure data is an array and filter out null productId values
        setOrders(Array.isArray(response.data) ? response.data.filter(item => item.productId) : []);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        toast.error("Failed to load user orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [userId, navigate]);

  const handleRemove = async (cartItemId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${userId}/cart/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prevOrders) => prevOrders.filter((item) => item._id !== cartItemId));
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    }
  };

  if (loading) {
    return <p className="text-center text-2xl font-semibold">Loading orders...</p>;
  }

  return (
    <section className="min-h-[60vh] bg-green-50 flex justify-center items-center py-10 px-6 md:px-20">
      <div className="max-w-6xl w-full bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-center mb-6">
          <img src="/main_page_img/Orders.png" alt="Orders" className="w-12 h-12 mr-3" />
          <h1 className="text-3xl font-bold text-secondary">User's Orders</h1>
        </div>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No orders found for this user.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-lg">
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 flex items-center space-x-4">
                      <img
                        src={item.productId?.image || "/placeholder-image.jpg"}
                        alt={item.productId?.name || "Product Image"}
                        className="w-16 h-16 rounded-lg border"
                      />
                      <span className="text-gray-800 font-medium">{item.productId?.name || "Unknown Product"}</span>
                    </td>
                    <td className="p-4 text-gray-800 font-medium">
                      ${item.productId?.price ? item.productId.price.toFixed(2) : "0.00"}
                    </td>
                    <td className="p-4 text-gray-800">{item.quantity || 0}</td>
                    <td className="p-4 text-gray-800 font-semibold">
                      ${item.productId?.price ? (item.productId.price * (item.quantity || 0)).toFixed(2) : "0.00"}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700"
                      >
                        Remove
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

export default UserOrders;
