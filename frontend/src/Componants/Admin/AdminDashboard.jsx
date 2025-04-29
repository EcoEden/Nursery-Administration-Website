import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start pt-20 min-h-[56vh] bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-secondary mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Users Section */}
        <div
          className="p-8 bg-white rounded-2xl shadow-lg text-center cursor-pointer hover:bg-green-200 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/admin/users")}
        >
          <h2 className="text-2xl font-semibold text-primary">Buyers</h2>
          <p className="text-gray-600 mt-2">View and manage buyer accounts</p>
        </div>

        {/* Sellers Section */}
        <div
          className="p-8 bg-white rounded-2xl shadow-lg text-center cursor-pointer hover:bg-green-300 transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/admin/sellers")}
        >
          <h2 className="text-2xl font-semibold text-primary">Sellers</h2>
          <p className="text-gray-600 mt-2">View and manage seller accounts</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
