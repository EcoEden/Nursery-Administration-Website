import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCloudUpload } from "react-icons/bs";
import { ImageToBase64 } from "../../utility/ImageToBase64";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to edit a product.");
          navigate("/login");
          return;
        }

        const response = await axios.get(`http://13.201.26.192:5000/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Error fetching product details.");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageData = await ImageToBase64(file);
      setData((prev) => ({ ...prev, image: imageData }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to update a product.");
        navigate("/login");
        return;
      }
  
      console.log("Submitting data:", JSON.stringify(data, null, 2));
  
      const response = await axios.put( `http://localhost:5000/edit-product/${id}`,
  data,
  {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Ensure token is being sent
    },
  });
  
      alert("Product updated successfully!");
      navigate("/seller-dashboard");
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.response?.data?.error || "Failed to update product.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-secondary text-center mb-8">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              required
            >
              <option value="">Select Category</option>
              <option value="indoor">Indoor Plant</option>
              <option value="outdoor">Outdoor Plant</option>
            </select>
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-2">Product Image</label>
            <div className="h-60 w-full bg-slate-200 rounded-lg flex flex-col items-center justify-center relative">
              {data.image ? (
                <>
                  <img src={data.image} alt="Product" className="h-full rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, image: "" }))}
                    className="absolute bottom-2 right-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Change Image
                  </button>
                </>
              ) : (
                <>
                  <span className="text-5xl text-gray-400">
                    <BsCloudUpload />
                  </span>
                  <label htmlFor="image" className="cursor-pointer mt-2 text-blue-500 underline">
                    Upload Image
                  </label>
                </>
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
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleOnChange}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleOnChange}
              rows="5"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-green-700 text-white py-4 rounded-lg text-xl font-semibold"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
