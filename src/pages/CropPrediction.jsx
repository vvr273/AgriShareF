import React, { useState } from 'react';
import { predictCrop, getCropInfo } from '../utills/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // For syntax highlighting
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a theme for highlighting

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [predictedCrop, setPredictedCrop] = useState('');
  const [cropInfo, setCropInfo] = useState('');
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePredictCrop = async () => {
    try {
      const data = await predictCrop(formData);
      const { predicted_crop } = data;
      setPredictedCrop(predicted_crop);
      localStorage.setItem('predictedCrop', predicted_crop);
      setShowMoreInfo(true);
    } catch (error) {
      console.error('Error predicting crop:', error);
    }
  };

  const handleGetMoreInfo = async () => {
    const storedCrop = localStorage.getItem('predictedCrop');
    try {
      const data = await getCropInfo(storedCrop);
      const { crop_info } = data;
      setCropInfo(crop_info);
      setIsModalOpen(true); // Open the modal when crop info is available
    } catch (error) {
      console.error('Error fetching crop info:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Farmer's Crop Prediction</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="grid grid-cols-2 gap-4">
          {['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border border-gray-300 rounded px-4 py-2"
            />
          ))}
        </div>
        <button
          onClick={handlePredictCrop}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Predict Crop
        </button>
      </div>

      {showMoreInfo && (
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-700">
            Predicted Crop: <span className="text-green-600">{predictedCrop}</span>
          </p>
          <button
            onClick={handleGetMoreInfo}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Get More Info
          </button>
        </div>
      )}

      {/* Modal for displaying crop information */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-w-lg w-full max-h-full md:max-h-[80vh] md:max-w-xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crop Information</h2>
            <div className="overflow-y-auto max-h-60 md:max-h-96">
              <SyntaxHighlighter language="markdown" style={materialLight}>
                {cropInfo}
              </SyntaxHighlighter>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropPrediction;
