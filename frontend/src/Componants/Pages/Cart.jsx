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
    if (!user) navigate("/login");
    else fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCartItems(response.data));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        dispatch(removeFromCartRedux(id));
        alert("Successfully removed item.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item.");
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/${id}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Error updating quantity.");
    }
  };

  const handleBuyNow = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        { cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        alert("Order placed successfully!");
        dispatch(setCartItems([]));
        navigate("/orders");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order.");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );
  const discount = Math.round(subtotal * 0.17);
  const deliveryFee = subtotal >= 499 ? 0 : 49;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

   

      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-3 pb-1 text-xs text-gray-500">
        Home &rsaquo; <span className="text-green-700 font-medium">Shopping Cart</span>
      </div>

      {/* ── Main ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-4 flex flex-col lg:flex-row gap-4 items-start">

        {/* ── Left: Cart Items ── */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="bg-white border border-gray-200 rounded shadow-sm px-5 py-4 mb-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-sm text-gray-500">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded shadow-sm p-12 text-center">
              <p className="text-5xl mb-4">🛒</p>
              <p className="text-lg font-semibold text-gray-700 mb-1">Your cart is empty</p>
              <p className="text-sm text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
              <button
                onClick={() => navigate("/")}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-6 py-2.5 rounded transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded shadow-sm p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4"
                >
                  {/* Image */}
                  <div className="w-28 h-28 shrink-0 bg-gray-50 rounded flex items-center justify-center border border-gray-100">
                    <img
                      src={item.productId?.image || "https://via.placeholder.com/100"}
                      alt={item.productId?.name || "Product"}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h2 className="text-base font-semibold text-gray-800 mb-0.5">
                      {item.productId?.name || "Unknown Product"}
                    </h2>
                    <p className="text-xs text-gray-400 mb-1 capitalize">{item.productId?.category || ""}</p>

                    <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                      <span className="text-lg font-bold text-gray-900">₹{item.productId?.price || "N/A"}</span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{Math.round((item.productId?.price || 0) * 1.2)}
                      </span>
                      <span className="text-xs font-semibold text-green-600">17% off</span>
                    </div>

                    <p className="text-xs text-green-600 font-medium mt-1">✅ In Stock &nbsp;|&nbsp; Free Delivery</p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        <AiOutlineMinus size={15} />
                      </button>
                      <span className="px-4 py-1.5 text-sm font-semibold text-gray-800 border-x border-gray-300 min-w-[36px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <AiOutlinePlus size={15} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      className="bg-secondary hover:bg-green-700 text-white px-5 py-1.5 rounded text-sm font-semibold transition w-full"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Order Summary ── */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-80 shrink-0 flex flex-col gap-3">

            {/* Promo */}
            <div className="bg-white border border-gray-200 rounded shadow-sm p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">🎁 Apply Coupon</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-yellow-400 transition"
                />
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-3 py-1.5 rounded transition">
                  Apply
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white border border-gray-200 rounded shadow-sm p-4">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 border-b pb-2">
                Price Details
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Price ({cartItems.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (17%)</span>
                  <span>− ₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
              </div>
              <div className="border-t mt-3 pt-3 flex justify-between font-bold text-gray-900 text-base">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
              {discount > 0 && (
                <p className="text-green-600 text-xs font-semibold mt-2">
                  🎉 You save ₹{discount} on this order!
                </p>
              )}

              <button
                className="w-full mt-4 bg-secondary hover:bg-green-700 text-white font-semibold text-base py-3 rounded transition"
                onClick={handleBuyNow}
              >
                Place Order
              </button>
            </div>

            {/* Trust Badges */}
            <div className="bg-white border border-gray-200 rounded shadow-sm p-4">
              <ul className="text-xs text-gray-500 space-y-2">
                <li>🔒 Safe and Secure Payments</li>
                <li>✅ Easy Returns — 7 Day Policy</li>
                <li>🚚 Free Delivery on orders above ₹499</li>
                <li>🌿 100% Authentic Plants</li>
              </ul>
            </div>

          </div>
        )}
      </main>

   

    </div>
  );
};

export default Cart;