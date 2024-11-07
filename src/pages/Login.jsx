import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utills/api'; // Assuming you have this function in api.js
import backgroundImage from '../assets/img_login.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Replaces useHistory()

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      const data = await loginUser(email, password);
      localStorage.setItem('authToken', data.token); // Store the token in localStorage
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6 py-12 bg-black bg-opacity-40 sm:bg-opacity-60">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome Back</h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Log in to continue your blogging journey and connect with others.
        </p>
        <div className="bg-white bg-opacity-10 rounded-lg p-8 shadow-lg max-w-sm sm:max-w-md mx-auto">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input
                type="email"
                id="email"
                aria-label="Email"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-300 placeholder-white text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-lg font-medium">Password</label>
              <input
                type="password"
                id="password"
                aria-label="Password"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-300 placeholder-white text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 bg-red-100 rounded-lg py-2 px-4 mt-2">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <div className="mt-4">
            <p className="text-lg">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
            </p>
            <p className="text-lg mt-2">
              <Link to="/forgot-password" className="text-blue-400 hover:underline">Forgot Password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
