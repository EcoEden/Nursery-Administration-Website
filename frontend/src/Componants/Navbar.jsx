import React, { useState, useEffect, useRef } from 'react';
import { RiPlantFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { FaRegUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../Redux/userSlice';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const NavMenu = [
    { id: 1, title: 'Home', link: '/' },
    { id: 2, title: 'Menu', link: '/Menu' },
    { id: 3, title: 'About', link: '/About' },
  ];

  const handleShowMenu = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    dispatch(loginRedux());
  };

  // ✅ Close dropdown when clicking outside
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
      <div className="bg-[#F5F5F5] h-20 w-full flex gap-4 md:gap-7 justify-between items-center md:px-4 shadow-md relative z-50">
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
          <div className="relative cursor-pointer hover:text-green-700 transition duration-300">
            <FaShoppingCart />
            <span className="absolute -top-1 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </div>

          <div onClick={handleShowMenu} className="cursor-pointer relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {userData.image ? (
                <img
                  src={userData.image}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>

            {/* Dropdown Menu */}
            {showMenu && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-4 bg-white shadow-lg rounded-lg py-2 w-40 text-sm z-50"
              >
                <Link
                  to="/NewProduct"
                  className="block px-4 py-2 hover:bg-green-50 hover:text-green-700"
                >
                  New Product
                </Link>
                {userData.image ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-white bg-secondary hover:bg-green-700 rounded-b-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/Login"
                    className="block px-4 py-2 hover:bg-green-50 hover:text-green-700"
                  >
                    Login
                  </Link>
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
