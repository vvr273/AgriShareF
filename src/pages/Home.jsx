import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/img1.jpg';

const Home = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-6 bg-opacity-60 bg-gray-900">
        <div className="flex items-center">
          <img src="path/to/logo.png" alt="Agrishare Logo" className="h-12 w-12 mr-3" />
          <span className="text-2xl font-bold">Agrishare</span>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/contactus" className="hover:text-blue-400">Contact Us</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-blue-400">Sign Up</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
          </li>
          <li>
            <Link to="/ourmodel" className="hover:text-blue-400">Our Model</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6 py-12 bg-black bg-opacity-50">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to Agrishare
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Share your agricultural knowledge and learn from others in the community.
        </p>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg max-w-lg mx-auto">
          <p className="text-lg md:text-xl">
            Create an account to start your journey or sign in to continue sharing your voice.
          </p>
        </div>
      </div>

      {/* Buttons */}
      
    </div>
  );
};

export default Home;
