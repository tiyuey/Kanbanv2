import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = await axios.post('http://localhost:5001/v2/signup', {
        email,
        password,
      });
      navigate('/login')
     
      console.log(formData);
    } catch (error) {
      
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black font-montserrat">
      <div className="bg-gray-800 p-32 rounded-md text-center">
        <h2 className="text-3xl mb-6 text-white">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-xl text-white mb-2">Email:</label>
            <input
              type="email"
              className="w-full p-3 border border-white-500 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl text-white mb-2">Password:</label>
            <input
              type="password"
              className="w-full p-3 border border-white-500 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-navy-500 text-white py-3 px-6 rounded-lg text-xl"
          >
          Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
