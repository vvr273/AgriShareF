import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../utills/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import backgroundImage from '../assets/img3_singup.jpg';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    const confirmShow = window.confirm("Are you sure you want to show your password?");
    if (confirmShow) {
      setShowPassword(!showPassword);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signupUser(name, username, email, password);
      navigate('/login'); 
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Join Us</h1>
        <p className="text-xl md:text-2xl mb-8">
          Sign up to start your blogging journey and connect with a community of passionate writers.
        </p>
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 shadow-lg max-w-md mx-auto">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-lg font-medium">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-300 placeholder-white focus:border-purple-500 focus:outline-none"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="block text-lg font-medium">Username</label>
              <input
                type="text"
                id="username"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-300 placeholder-white focus:border-purple-500 focus:outline-none"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-300 placeholder-white focus:border-purple-500 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 relative">
              <label htmlFor="password" className="block text-lg font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-300 placeholder-white focus:border-purple-500 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4">
            <p className="text-lg">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:underline">Log In</Link>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
