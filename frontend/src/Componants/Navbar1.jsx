import React, { useState } from 'react';
import { RiPlantFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import defaultAvatar from '/main_page_img/default_profile_img.png';

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const NavMenu = [
    { id: 1, title: 'Home', link: '/' },
    { id: 2, title: 'Our Collection', link: '/OurCollection' },
    { id: 3, title: 'About', link: '/About' },
  ];

  const handleProfileClick = () => {
    if (userData._id) {
      navigate(`/profile/${userData._id}`);
    } else {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-[#F5F5F5] shadow-md">
      <div className="h-20 w-full flex justify-between items-center px-4 md:px-8 relative">
        
        {/* Logo */}
        <Link to="/" className="flex items-center uppercase text-2xl font-bold">
          <p className="uppercase text-primary">Eco</p>
          <p className="uppercase text-secondary">Eden</p>
          <RiPlantFill className="text-secondary text-4xl" />
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-lg"
            />
            <button
              type="submit"
              className="rounded-lg bg-secondary hover:bg-green-700 text-white px-4 py-2 text-lg font-semibold transition duration-300"
            >
              Search
            </button>
          </div>
        </form>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-lg font-medium">
          {NavMenu.map((menu) => (
            <li key={menu.id}>
              <Link
                to={menu.link}
                className="text-gray-700 hover:text-green-700 transition duration-300"
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Cart & Profile */}
        <div className="flex items-center gap-6 text-3xl text-primary relative">
          <Link to="/cart">
            <div className="relative cursor-pointer hover:text-green-700 transition duration-300">
              <FaShoppingCart />
              <span className="absolute -top-1 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </div>
          </Link>

          <div onClick={handleProfileClick} className="cursor-pointer relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <img
                src={userData.image || defaultAvatar}
                alt="User"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultAvatar;
                }}
              />
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5F5F5] w-full absolute top-20 left-0 shadow-md">
          <ul className="flex flex-col items-center text-lg font-medium space-y-4 py-4">
            {NavMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  className="text-gray-700 hover:text-green-700 transition duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="px-4 py-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-lg"
              />
              <button
                type="submit"
                className="rounded-lg bg-secondary hover:bg-green-700 text-white px-4 py-2 text-lg font-semibold transition duration-300"
              >
                Go
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;