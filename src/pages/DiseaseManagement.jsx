import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictDisease } from '../utills/api';
import apple from '../assets/apple.avif';
import tomato from '../assets/tomato.jpeg';
import corn from '../assets/corn.jpeg'; // New image
import peach from '../assets/peach.jpeg'; // New image
import grape from '../assets/grape.jpeg'; // New image
import pepperbell from '../assets/pepperbell.jpeg'; // New image

const plants = [
  { name: 'Apple', image: apple },
  { name: 'Tomato', image: tomato },
  { name: 'Corn', image: corn }, // New entry
  { name: 'Peach', image: peach }, // New entry
  { name: 'Grape', image: grape }, // New entry
  { name: 'Pepper Bell', image: pepperbell }, // New entry
];

const DiseaseManagement = () => {
  const navigate = useNavigate();
  const [logoOpacity, setLogoOpacity] = useState(1); // State for logo opacity

  // Animation effect for the logo
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoOpacity(prevOpacity => (prevOpacity === 1 ? 0.5 : 1));
    }, 5000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCameraClick = () => {
    navigate('/CameraCapture');
  };

  const handleUploadClick = () => {
    navigate('/upload');
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const prediction = await predictDisease(formData);
      navigate('/results', { state: { prediction } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-6">
      <h1
        className="text-4xl font-bold text-green-600 mb-4 transition-opacity duration-1000"
        style={{ opacity: logoOpacity }}
      >
        AGRI SHARE
      </h1>
      <p className="text-lg text-green-700 mb-8 text-center">
        This AI Engine Will Help Detect Diseases in Fruits and Vegetables
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {plants.map((plant) => (
          <div
            key={plant.name}
            className="flex flex-col items-center bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-32 rounded-lg object-cover mb-2" // Ensures all images have the same height
            />
            <p className="text-lg font-semibold text-gray-800">{plant.name}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleCameraClick}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Camera
        </button>
        <button
          onClick={handleUploadClick}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Upload by File
        </button>
      </div>

      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DiseaseManagement;
