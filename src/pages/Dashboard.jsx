import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll'; // For smooth scrolling
import farmerImage from '../assets/farmerapp.jpeg';
import paddy from '../assets/paddy.jpg';
import feature1 from '../assets/img3_singup.jpg';
import feature2 from '../assets/img3_singup.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const heroText = document.querySelector('.hero-text');
      const scrollY = window.scrollY;
      if (scrollY < 600) {
        heroText.style.transform = `translateY(${scrollY / 3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 bg-white shadow-md py-4 px-6 flex justify-between items-center z-50">
        <div className="text-2xl font-bold text-green-700">AgriShare</div>
        <ul className="flex space-x-6">
          <li>
            <Link to="hero" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-green-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="features" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-green-700">
              Services
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-green-700">
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div id="hero" className="relative">
        <img src={paddy} alt="Paddy Field" className="w-full h-[80vh] object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <div className="hero-text transition-transform duration-500">
            <h1 className="text-5xl font-bold mb-4">AgriShare</h1>
            <p className="text-2xl italic">"Empowering Farmers with Innovation and Expertise"</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div id="about" className="bg-gray-100 py-12 flex justify-center items-center flex-col-reverse md:flex-row">
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At AgriShare, we aim to revolutionize agriculture through data-driven insights, crop predictions, disease management, and fertilization recommendations.
          </p>
          <p className="text-gray-600 mb-4">
            Join us in building a better future for farming communities with easy-to-use tools and expert solutions.
          </p>
          <p className="text-gray-600">
            We believe in empowering farmers with the latest technology to improve yield, reduce costs, and enhance sustainability.
          </p>
        </div>
        <div className="md:w-1/2 p-6 flex justify-center">
          <img src={farmerImage} alt="Farmer" className="w-3/4 rounded-lg shadow-md" />
        </div>
      </div>

      {/* Feature Cards Section */}
      <div id="features" className="bg-white py-16">
        <h2 className="text-center text-3xl font-bold text-green-700 mb-10">Our Features</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
          {/* Feature 1: Crop Prediction */}
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate('/CropPrediction')} // Navigate to Crop Prediction page
          >
            <img src={feature1} alt="Crop Prediction" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-2">Crop Prediction</h3>
              <p className="text-gray-600">
                Get accurate crop predictions based on soil data and weather conditions to maximize yield and efficiency.
              </p>
            </div>
          </div>

          {/* Feature 2: Disease Management */}
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate('/DiseaseManagement')} // Navigate to Disease Management page
          >
            <img src={feature2} alt="Disease Management" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-2">Disease Management</h3>
              <p className="text-gray-600">
                Identify crop diseases early and get actionable solutions to protect your farm from outbreaks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
