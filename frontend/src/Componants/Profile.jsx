import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutRedux } from '../Redux/userSlice';

const Profile = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutRedux());
    navigate('/login');
  };

  if (!userData.name) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md select-none cursor-default">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
          {userData.image ? (
            <img
              src={userData.image}
              alt="User"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle className="text-5xl mx-auto my-5" />
          )}
        </div>
        <div>
          <p className="text-xl font-semibold">{userData.name}</p>
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-secondary hover:bg-green-700 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
