import React, { useEffect, useState } from 'react';
import { RiPlantFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import defaultAvatar from '/main_page_img/default_profile_img.png';

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const cartData = useSelector((state) => state.cart.items || []);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [userRole, setUserRole] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    if (userData?.image) {
      setProfileImage(userData.image);
    } else if (storedUser?.image) {
      setProfileImage(storedUser.image);
    } else {
      setProfileImage(defaultAvatar);
    }

    const role = userData?.role || storedUser?.role || '';
    setUserRole(role);

    if (role === 'admin') {
      navigate('/admin-dashboard');
    }
  }, [userData, navigate]);

  const handleProfileClick = () => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    const userId = userData?._id || storedUser?._id;
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileSearchOpen(false);
    }
  };

  let NavMenu = [];
  if (userRole === 'admin') {
    NavMenu = [{ id: 1, title: 'Admin Dashboard', link: '/' }];
  } else if (userRole === 'seller') {
    NavMenu = [{ id: 1, title: 'Seller Dashboard', link: '/seller-dashboard' }];
  } else {
    NavMenu = [
      { id: 1, title: 'Home', link: '/' },
      { id: 2, title: 'Our Collection', link: '/OurCollection' },
      { id: 3, title: 'About', link: '/About' },
    ];
  }

  return (
    <nav>
      <div className="bg-[#F5F5F5] h-20 w-full flex justify-between items-center px-4 shadow-md relative z-50">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center uppercase text-2xl font-bold">
            <p className="uppercase text-primary">Eco</p>
            <p className="uppercase text-secondary">Eden</p>
            <RiPlantFill className="text-secondary text-4xl" />
          </div>
        </Link>

       

        {/* Desktop Search */}
        {userRole !== 'seller' && userRole !== 'admin' && (
          <form onSubmit={handleSearch} className="hidden lg:block">
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
        )}

         {/* Desktop Nav */}
         <ul className="hidden lg:flex items-center gap-6 text-lg font-medium">
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

        {/* Right Section */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Mobile Search Icon */}
          {userRole !== 'seller' && userRole !== 'admin' && (
            <button
              className="text-2xl text-gray-700 lg:hidden"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <FaSearch />
            </button>
          )}

          {/* Hamburger Icon for Mobile */}
          <button
            className="lg:hidden text-2xl text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars />
          </button>

          {/* Desktop Cart */}
          {userRole !== 'seller' && userRole !== 'admin' && (
            <Link to="/cart" className="hidden lg:block relative text-2xl text-primary">
              <FaShoppingCart />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartData.length || 0}
              </span>
            </Link>
          )}

          {/* Desktop Profile */}
          <div
            onClick={handleProfileClick}
            className="hidden lg:block w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
          >
            <img
              src={profileImage}
              alt="User"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isMobileSearchOpen && (
        <form onSubmit={handleSearch} className="lg:hidden px-4 pb-4 mt-2">
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
              className="rounded-lg bg-secondary hover:bg-green-700 text-white px-4 py-2 text-lg font-semibold"
            >
              Search
            </button>
          </div>
        </form>
      )}

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            {NavMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-green-700 transition"
                >
                  {menu.title}
                </Link>
              </li>
            ))}

            {/* Mobile Cart */}
            {userRole !== 'seller' && userRole !== 'admin' && (
              <li>
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition"
                >
                  <FaShoppingCart />
                  Cart
                  <span className="ml-auto bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartData.length || 0}
                  </span>
                </Link>
              </li>
            )}

            {/* Mobile Profile */}
            <li>
              <button
                onClick={() => {
                  handleProfileClick();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition"
              >
                <img
                  src={profileImage}
                  alt="User"
                  className="w-6 h-6 rounded-full object-cover bg-gray-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                />
                Profile
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
