import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCartItems, removeFromCartRedux } from "../../Redux/cartSlice";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; 

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setCartItems(response.data));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        dispatch(removeFromCartRedux(id)); 
        alert("Successfully remove item.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item.");
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantity

    try {
      const response = await axios.put(
        `http://localhost:5000/cart/${id}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        fetchCart(); // Refresh cart after update
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert(" Error updating quantity.");
    }
  };

  return (
    <div className="container min-h-[50vh] bg-green-50 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. Start shopping!</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div key={item._id} className="border p-4 flex items-center gap-4 relative">
              {/* Product Image */}
              <img
                src={item.productId?.image || "https://via.placeholder.com/100"}
                alt={item.productId?.name || "Product"}
                className="w-20 h-20 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {item.productId?.name || "Unknown Product"}
                </h2>
                <p className="text-gray-600">
                  Price: ₹{item.productId?.price || "N/A"}
                </p>
              </div>

              {/* Quantity Controls (Positioned Top Right) */}
              <div className="absolute top-3 mb-4 pb-5 right-6 flex items-center">
                <button
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  <AiOutlineMinus size={18} />
                </button>

                <span className="mx-2 text-lg font-medium">{item.quantity}</span>

                <button
                  className="p-2 pb-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  <AiOutlinePlus size={18} />
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="mt-10 bg-secondary hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition"
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
