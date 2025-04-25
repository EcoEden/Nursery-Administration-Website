import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found. Please log in.");
                    return;
                }
                const response = await axios.get("http://13.201.26.192:5000/admin/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Unauthorized. Please log in.");
                return;
            }
            await axios.delete(`http://13.201.26.192:5000/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((user) => user._id !== userId));
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <p className="text-2xl font-semibold">Loading users...</p>
            </div>
        );
    }

    return (
        <section className="min-h-[55vh] bg-green-50 py-10 px-6 md:px-20">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-center mb-6 text-gray-700">
                    <img src="../main_page_img/User.png" alt="Users" className="w-10 h-10 mr-3" />
                    <h1 className="text-4xl font-bold text-secondary">Buyer List</h1>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 text-lg">
                                <th className="p-4 text-left">First Name</th>
                                <th className="p-4 text-left">Last Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Role</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 text-gray-800 font-medium">{user.firstName}</td>
                                    <td className="p-4 text-gray-800 font-medium">{user.lastName}</td>
                                    <td className="p-4 text-gray-600">{user.email}</td>
                                    <td className="p-4 text-gray-800 font-semibold capitalize">{user.role}</td>
                                    <td className="p-4 flex space-x-2">
                                        <Link
                                            to={`/admin/users/${user._id}/orders`}
                                            className="bg-secondary text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700"
                                        >
                                            View Orders
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(user._id)}
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

export default UsersList;
