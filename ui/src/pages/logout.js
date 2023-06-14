import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5001/v2/logout');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black font-montserrat">
      <div className="bg-gray-800 p-32 rounded-md text-center">
        <h2 className="text-3xl mb-6 text-white">Logout?</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-3 px-6 rounded-lg text-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
