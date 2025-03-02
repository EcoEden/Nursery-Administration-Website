import React, { useState } from 'react';
import { BsCloudUpload } from "react-icons/bs";
import { ImageToBase64 } from '../utility/ImageToBase64';
import process from 'process';

const NewProduct = () => {
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
    console.log(data);
    const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${baseUrl}/NewProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-secondary text-center mb-8">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={data.name}
              onChange={handleOnchange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnchange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              required
            >
              <option value="">Select Category</option>
              <option>Indoor Plant</option>
              <option>Outdoor Plant</option>
            </select>
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-2">Product Image</label>
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
            <label className="block text-xl text-gray-700 mb-2">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Enter price"
              value={data.price}
              onChange={handleOnchange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleOnchange}
              rows="5"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-green-700 text-white py-4 rounded-lg text-xl font-semibold transition duration-300"
          >
            Upload Product
          </button>
        </form>
      </div>

      {/* Optional similar image section for design consistency */}
      <div className="mt-16 flex flex-wrap justify-evenly">
        <div className="w-[30%] flex flex-col items-center mb-6">
          <img
            className="rounded-full h-32"
            src="/public/main_page_img/gardening.webp"
            alt="Gardening"
          />
          <p className="text-lg mt-3">Gardening Tips</p>
        </div>
        <div className="w-[30%] flex flex-col items-center mb-6">
          <img
            className="rounded-full h-32"
            src="/public/main_page_img/main.webp"
            alt="Support"
          />
          <p className="text-lg mt-3">Support</p>
        </div>
        <div className="w-[30%] flex flex-col items-center mb-6">
          <img
            className="rounded-full h-32"
            src="/public/main_page_img/main1.webp"
            alt="Services"
          />
          <p className="text-lg mt-3">Our Services</p>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
