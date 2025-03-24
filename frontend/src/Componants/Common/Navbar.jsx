import React, { useEffect, useState } from 'react';
import { RiPlantFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import defaultAvatar from '/main_page_img/default_profile_img.png';

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const cartData = useSelector((state) => state.cart.items || []);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [userRole, setUserRole] = useState('');

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
    
    // Redirect Admin to Dashboard on Login
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
    }
  };

  // Define Role-Based Navigation
  let NavMenu = [];
  if (userRole === 'admin') {
    NavMenu = [{ id: 1, title: 'Admin Dashboard', link: '/admin-dashboard || /' },
    ];
    
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
      <div className="bg-[#F5F5F5] h-20 w-full flex gap-4 md:gap-7 justify-between items-center md:px-4 shadow-md relative z-50 select-none cursor-default">
        {/*  Logo */}
        <Link to="/">
          <div className="flex items-center uppercase text-2xl font-bold">
            <p className="uppercase text-primary">Eco</p>
            <p className="uppercase text-secondary">Eden</p>
            <RiPlantFill className="text-secondary text-4xl" />
          </div>
        </Link>

        {/* Show Search Bar for Users Only */}
        {userRole !== 'seller' && userRole !== 'admin' && (
          <form onSubmit={handleSearch}>
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

        {/* Navigation Menu */}
        <ul className="flex items-center gap-6 text-lg font-medium">
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

        {/* Right Section: Cart, Dashboard, Profile */}
        <div className="flex items-center gap-6 text-3xl text-primary relative">
          {/* Cart (Users Only) */}
          {userRole !== 'seller' && userRole !== 'admin' && (
            <Link to="/cart">
              <div className="relative cursor-pointer hover:text-green-700 transition duration-300">
                <FaShoppingCart />
                <span className="absolute -top-1 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartData.length || 0}
                </span>
              </div>
            </Link>
          )}

          {/* Dashboard (Sellers & Admins) */}
          {(userRole === 'seller' || userRole === 'admin') && (
            <Link
              to={userRole === 'seller' ? '/seller-dashboard' : '/admin-dashboard'}
              className="text-lg text-gray-700 px-4 py-2 rounded-lg transition duration-300 font-semibold"
            >
              Dashboard
            </Link>
          )}

          {/* Profile Picture */}
          <div onClick={handleProfileClick} className="cursor-pointer relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
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
      </div>
    </nav>
  );
};

export default Navbar;
