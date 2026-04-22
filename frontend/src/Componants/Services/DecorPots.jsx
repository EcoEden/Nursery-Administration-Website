import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCartRedux } from "../../Redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

const PRICE_RANGES = [
  { label: "Under ₹300", min: 0, max: 300 },
  { label: "₹300 – ₹600", min: 300, max: 600 },
  { label: "₹600 – ₹1000", min: 600, max: 1000 },
  { label: "Above ₹1000", min: 1000, max: Infinity },
];

const DecorPots = () => {
  const [decorPots, setDecorPots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDecorPots = async () => {
      try {
        const response = await axios.get(`${baseurl}/products?category=Decor Pots`);
        setDecorPots(response.data);
      } catch (error) {
        console.error("Error fetching decor pots:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDecorPots();
  }, []);

  const categories = ["All", ...new Set(decorPots.map((p) => p.subcategory).filter(Boolean))];

  const filteredPots = decorPots
    .filter((p) => filterCategory === "All" || p.subcategory === filterCategory)
    .filter((p) => {
      if (!selectedPriceRange) return true;
      return p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const handleAddToCart = async (event, pot) => {
    event.preventDefault();
    event.stopPropagation();

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userId = user?._id || storedUser?._id;
    const token = user?.token || storedUser?.token;

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${baseurl}/cart/add`,
        { userId, productId: pot._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        dispatch(addToCartRedux({ ...pot, quantity: 1 }));
        setAddedToCart((prev) => ({ ...prev, [pot._id]: true }));
        setTimeout(() => setAddedToCart((prev) => ({ ...prev, [pot._id]: false })), 2000);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Error adding to cart.");
    }
  };

  const toggleWishlist = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const discountedPrice = (price) => Math.round(price * 1.18);
  const discountPercent = (price) => 15;

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading decor pots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 font-sans">

      {/* ── Top Offer Banner ── */}
      <div className="bg-green-700 text-white text-center py-2 text-sm font-medium tracking-wide">
        🪴 Free Delivery on orders above ₹499 &nbsp;|&nbsp; 🎁 Use code{" "}
        <span className="font-bold">POT10</span> for 10% off
      </div>

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-1 text-xs text-gray-500">
        <Link to="/" className="text-green-700 hover:underline font-medium">Home</Link>
        {" "}›{" "}
        <Link to="/shop" className="text-green-700 hover:underline font-medium">Shop</Link>
        {" "}›{" "}
        <span className="text-gray-700 font-semibold">Decor Pots</span>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">

        {/* ────── Sidebar ────── */}
        <aside className="hidden md:block w-56 shrink-0 self-start ">
          <div className="bg-white rounded shadow px-4 py-3 mb-4 border border-green-100">

            <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-4">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Filters</h2>
              <button
                onClick={() => { setFilterCategory("All"); setSelectedPriceRange(null); setSortBy("featured"); }}
                className="text-xs text-green-700 hover:underline font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</p>
                <ul className="space-y-0.5">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setFilterCategory(cat)}
                        className={`w-full text-left text-sm px-2 py-1.5 rounded transition ${
                          filterCategory === cat
                            ? "bg-green-50 text-green-700 font-semibold border-l-4 border-green-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price Filter */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Price Range</p>
              <ul className="space-y-0.5">
                {PRICE_RANGES.map((range) => (
                  <li key={range.label}>
                    <button
                      onClick={() =>
                        setSelectedPriceRange(
                          selectedPriceRange?.label === range.label ? null : range
                        )
                      }
                      className={`w-full text-left text-sm px-2 py-1.5 rounded transition flex items-center gap-2 ${
                        selectedPriceRange?.label === range.label
                          ? "bg-green-50 text-green-700 font-semibold border-l-4 border-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full border flex-shrink-0 ${
                          selectedPriceRange?.label === range.label
                            ? "bg-green-600 border-green-600"
                            : "border-gray-400"
                        }`}
                      />
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort By */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sort By</p>
              <ul className="space-y-0.5">
                {SORT_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <button
                      onClick={() => setSortBy(opt.value)}
                      className={`w-full text-left text-sm px-2 py-1.5 rounded transition ${
                        sortBy === opt.value
                          ? "bg-green-50 text-green-700 font-semibold border-l-4 border-green-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* ────── Main Content ────── */}
        <main className="flex-1 min-w-0">

          {/* Mobile Category Chips */}
          <div className="flex gap-2 mb-3 md:hidden overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full border font-medium transition ${
                  filterCategory === cat
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-green-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Header + Sort */}
          <div className="bg-white rounded shadow px-4 py-3 mb-4 flex items-center justify-between border border-green-100">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">{filteredPots.length}</span> results
              {filterCategory !== "All" && (
                <>
                  {" "}for{" "}
                  <span className="font-semibold text-green-700">"{filterCategory}"</span>
                </>
              )}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded px-2 py-1.5 text-gray-700 outline-none focus:border-green-500 hidden sm:block"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Empty State */}
          {filteredPots.length === 0 ? (
            <div className="bg-white rounded shadow p-12 text-center text-gray-400 border border-green-100">
              <p className="text-4xl mb-3">🪴</p>
              <p className="text-lg font-medium text-gray-600">No decor pots found</p>
              <p className="text-sm mt-1">Try adjusting the filters</p>
              <button
                onClick={() => { setFilterCategory("All"); setSelectedPriceRange(null); }}
                className="mt-4 text-sm text-green-700 underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredPots.map((pot) => (
                <Link
                  to={`/product/${pot._id}`}
                  key={pot._id}
                  className="group bg-white rounded shadow hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden border border-green-50 hover:border-green-200"
                >
                  {/* Image Area */}
                  <div className="relative bg-green-50 flex items-center justify-center h-44 sm:h-52 overflow-hidden">
                    <img
                      src={pot.image}
                      alt={pot.name}
                      className="h-36 w-36 sm:h-44 sm:w-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(e, pot._id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow text-gray-400 hover:text-red-500 transition z-10"
                      title="Add to Wishlist"
                    >
                      {wishlist[pot._id] ? (
                        <span className="text-red-500">❤️</span>
                      ) : (
                        <span>🤍</span>
                      )}
                    </button>

                    {/* Discount Badge */}
                    <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {discountPercent(pot.price)}% OFF
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 flex flex-col flex-1">
                    {pot.subcategory && (
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">{pot.subcategory}</p>
                    )}
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5 line-clamp-2 group-hover:text-green-700 transition-colors">
                      {pot.name}
                    </h3>

                    {/* Rating Pill */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        4.3 ★
                      </span>
                      <span className="text-[11px] text-gray-400">(64)</span>
                    </div>

                    {/* Price Row */}
                    <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-base sm:text-lg font-bold text-gray-900">₹{pot.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{discountedPrice(pot.price)}</span>
                      <span className="text-xs font-semibold text-green-600">{discountPercent(pot.price)}% off</span>
                    </div>

                    <p className="text-[11px] text-green-700 font-medium mt-1">✓ Free Delivery</p>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => handleAddToCart(e, pot)}
                      className={`mt-3 w-full font-semibold text-xs sm:text-sm py-2 rounded transition-all duration-200 ${
                        addedToCart[pot._id]
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : "bg-secondary hover:bg-green-700 text-white"
                      }`}
                    >
                      {addedToCart[pot._id] ? "✓ Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredPots.length > 0 && (
            <div className="flex justify-center items-center gap-1 mt-8 mb-4">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white rounded text-sm text-gray-500 hover:bg-green-50 hover:border-green-400 transition">
                ‹
              </button>
              {[1, 2, 3, 4, 5].map((pg) => (
                <button
                  key={pg}
                  className={`w-8 h-8 flex items-center justify-center border rounded text-sm transition ${
                    pg === 1
                      ? "bg-secondary text-white border-secondary font-semibold"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-green-50 hover:border-green-400"
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white rounded text-sm text-gray-500 hover:bg-green-50 hover:border-green-400 transition">
                ›
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DecorPots;