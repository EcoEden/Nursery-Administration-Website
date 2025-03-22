import React, { useState } from 'react';
import { BsCloudUpload } from "react-icons/bs";
import { ImageToBase64 } from '../../utility/ImageToBase64';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImage = async (e) => {
    const imageData = await ImageToBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a product.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userRole = storedUser?.role || ""; // Get user role

    try {
      const response = await fetch("http://localhost:5000/new-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Something went wrong");
      }

      alert("Product added successfully!");

      // Redirect based on role
      if (userRole === "seller") {
        navigate("/seller-dashboard");
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
      }

    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 select-none cursor-default">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-secondary text-center mb-8">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-md text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={data.name}
              onChange={handleOnchange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-md"
              required
            />
          </div>

          <div>
            <label className="block text-md text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnchange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-md"
              required
            >
              <option value="">Select Category</option>
              <option>Indoor Plant</option>
              <option>Outdoor Plant</option>
            </select>
          </div>

          <div>
            <label className="block text-md text-gray-700 mb-2">Product Image</label>
            <label htmlFor="image" className="cursor-pointer">
              <div className="h-60 w-full bg-slate-200 rounded-lg flex items-center justify-center">
                {data.image ? (
                  <img src={data.image} alt="Product" className="h-full rounded-lg" />
                ) : (
                  <span className="text-5xl text-gray-400">
                    <BsCloudUpload />
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                onChange={uploadImage}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-md text-gray-700 mb-2">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Enter price"
              value={data.price}
              onChange={handleOnchange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-md"
              required
            />
          </div>

          <div>
            <label className="block text-md text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleOnchange}
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-md resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-green-700 text-white py-2 rounded-lg text-md font-semibold transition duration-300"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
