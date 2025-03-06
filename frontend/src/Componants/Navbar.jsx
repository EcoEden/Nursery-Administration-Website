import React, { useState, useEffect, useRef } from 'react';
import { RiPlantFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../Redux/userSlice';

// Import the default avatar image from your local assets folder
import defaultAvatar from '/main_page_img/default_profile_img.png';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const NavMenu = [
    { id: 1, title: 'Home', link: '/' },
    { id: 2, title: 'Our Collection', link: '/OurCollection' },
    { id: 3, title: 'About', link: '/About' },
  ];

  const handleLogout = () => {
    dispatch(logoutRedux());
    setShowMenu(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav>
      <div className="bg-[#F5F5F5] h-20 w-full flex gap-4 md:gap-7 justify-between items-center md:px-4 shadow-md relative z-50 select-none cursor-default">
        <Link to="/">
          <div className="flex items-center uppercase text-2xl font-bold">
            <p className="uppercase text-primary">Eco</p>
            <p className="uppercase text-secondary">Eden</p>
            <RiPlantFill className="text-secondary text-4xl" />
          </div>
        </Link>

        <form>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="What are you looking for?"
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

        <div className="flex items-center gap-6 text-3xl text-primary relative">
          <Link to="/cart">
          <div className="relative cursor-pointer hover:text-green-700 transition duration-300">
            <FaShoppingCart />
            <span className="absolute -top-1 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
          </Link>

          <div
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer relative"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {/* Use the user's image if available; otherwise, use the local default avatar */}
              <img
                src={userData.image || defaultAvatar}
                alt="User"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop if default image also fails
                  e.target.src = defaultAvatar;
                }}
              />

            </div>

            {showMenu && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-4 bg-white shadow-lg rounded-lg py-2 w-40 text-sm z-50"
              >
                {userData.name ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-green-50 hover:text-green-700"
                      onClick={() => setShowMenu(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-green-50 hover:text-green-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-green-50 hover:text-green-700"
                      onClick={() => setShowMenu(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 hover:bg-green-50 hover:text-green-700"
                      onClick={() => setShowMenu(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
