import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellersList = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/sellers`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleDelete = async (sellerId) => {
    if (!window.confirm("Are you sure you want to delete this seller?")) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized. Please log in.");
        return;
      }

      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/sellers/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSellers(sellers.filter((seller) => seller._id !== sellerId));
      toast.success("Seller deleted successfully!");
    } catch (error) {
      console.error("Error deleting seller:", error);
      toast.error("Failed to delete seller.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-2xl font-semibold">Loading sellers...</p>
      </div>
    );
  }

  return (
    <section className="min-h-[55vh] bg-green-50 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-center mb-6 text-gray-700">
          <img src="../main_page_img/User.png" alt="Sellers" className="w-10 h-10 mr-3" />
          <h1 className="text-4xl font-bold text-secondary">Sellers List</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-lg">
                <th className="p-4 text-left">First Name</th>
                <th className="p-4 text-left">Last Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-800 font-medium">{seller.firstName}</td>
                  <td className="p-4 text-gray-800 font-medium">{seller.lastName}</td>
                  <td className="p-4 text-gray-600">{seller.email}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => navigate(`/sellers/${seller._id}/products`)}
                      className="bg-secondary text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700"
                    >
                      View Products
                    </button>

                    <button
                      onClick={() => handleDelete(seller._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700"
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

export default SellersList;
