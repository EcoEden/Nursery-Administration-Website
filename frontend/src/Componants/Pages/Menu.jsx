import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/plants`);
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const categories = ['All', ...new Set(plants.map((p) => p.category))];

  const filteredPlants = plants
    .filter((p) => filterCategory === 'All' || p.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading plants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">

      {/* ─── Top Banner ─── */}
      <div className="bg-green-700 text-white text-center py-2 text-sm font-medium tracking-wide">
        🌿 Free Delivery on orders above ₹499 &nbsp;|&nbsp; 🎁 Use code <span className="font-bold">GREEN10</span> for 10% off
      </div>

      {/* ─── Header Bar ─── */}
      {/* <div className="bg-green-600 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <h1 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight whitespace-nowrap">
            🌱 PlantStore
          </h1>

        
          <div className="flex-1 max-w-xl hidden sm:flex items-center bg-white rounded overflow-hidden shadow">
            <input
              type="text"
              placeholder="Search for plants, succulents, indoor..."
              className="flex-1 px-4 py-2 text-sm text-gray-700 outline-none"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-sm font-semibold text-gray-800 transition">
              🔍 Search
            </button>
          </div>

          <div className="flex gap-4 text-white text-sm font-medium">
            <button className="hidden sm:block hover:underline">Login</button>
            <button className="hover:underline">🛒 Cart</button>
          </div>
        </div>
      </div>
       */}

      {/* ─── Breadcrumb ─── */}
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-1 text-xs text-gray-500">
        Home &rsaquo; <span className="text-green-700 font-medium">Plants</span>
      </div>

      {/* ─── Main Layout ─── */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">

        {/* ── Sidebar Filters ── */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="bg-white rounded shadow p-4 sticky top-20">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3 border-b pb-2">
              Filters
            </h2>

            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Category</p>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setFilterCategory(cat)}
                      className={`w-full text-left text-sm px-2 py-1.5 rounded transition ${
                        filterCategory === cat
                          ? 'bg-green-50 text-green-700 font-semibold border-l-4 border-green-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Sort By</p>
              <ul className="space-y-1">
                {[
                  { value: 'featured', label: 'Featured' },
                  { value: 'price-asc', label: 'Price: Low to High' },
                  { value: 'price-desc', label: 'Price: High to Low' },
                  { value: 'name', label: 'Name A–Z' },
                ].map((opt) => (
                  <li key={opt.value}>
                    <button
                      onClick={() => setSortBy(opt.value)}
                      className={`w-full text-left text-sm px-2 py-1.5 rounded transition ${
                        sortBy === opt.value
                          ? 'bg-green-50 text-green-700 font-semibold border-l-4 border-green-600'
                          : 'text-gray-600 hover:bg-gray-50'
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

        {/* ── Product Grid ── */}
        <main className="flex-1 min-w-0">

          {/* Mobile Filter Row */}
          <div className="flex gap-2 mb-4 md:hidden overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full border font-medium transition ${
                  filterCategory === cat
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Header */}
          <div className="bg-white rounded shadow px-4 py-3 mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredPlants.length}</span> results for{' '}
              <span className="font-semibold text-green-700">"{filterCategory === 'All' ? 'Plants' : filterCategory}"</span>
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700 outline-none hidden sm:block"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>

          {/* Cards Grid */}
          {filteredPlants.length === 0 ? (
            <div className="bg-white rounded shadow p-12 text-center text-gray-400">
              <p className="text-4xl mb-3">🌵</p>
              <p className="text-lg font-medium">No plants found</p>
              <p className="text-sm mt-1">Try changing the filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredPlants.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="group bg-white rounded shadow hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative bg-gray-50 flex items-center justify-center h-44 sm:h-52 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-36 w-36 sm:h-44 sm:w-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Wishlist */}
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow text-gray-400 hover:text-red-500 transition"
                      title="Wishlist"
                    >
                      ♡
                    </button>
                    {/* Badge */}
                    {product.price < 300 && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        BUDGET PICK
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide">{product.category}</p>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5 line-clamp-2 group-hover:text-green-700 transition-colors">
                      {product.name}
                    </h3>

                    {/* Stars placeholder */}
                    <div className="flex items-center gap-1 mt-1">
                      <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        4.3 ★
                      </span>
                      <span className="text-[11px] text-gray-400">(128)</span>
                    </div>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{Math.round(product.price * 1.2)}</span>
                      <span className="text-xs font-semibold text-green-600">17% off</span>
                    </div>

                    <p className="text-[11px] text-green-700 font-medium mt-1">Free Delivery</p>

                    {/* <button
                      onClick={(e) => e.preventDefault()}
                      className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-xs sm:text-sm py-2 rounded transition"
                    >
                      Add to Cart
                    </button> */}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Menu;