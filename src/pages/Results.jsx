import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/paddy.jpg';
import { getPredictionInfo } from '../utills/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Results = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [infoData, setInfoData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load prediction data from localStorage on component mount
  useEffect(() => {
    const storedResult = localStorage.getItem('result');
    if (storedResult) {
      setPredictionData(JSON.parse(storedResult));
      localStorage.removeItem('result'); // Clear result from localStorage after retrieval
    }
  }, []);

  // Function to handle "Get More Info" button click
  const handleGetMoreInfo = async () => {
    if (predictionData) {
      // Format the disease name as per the expected API input
      const diseaseName = predictionData.result.prediction.replace('___', ', ');

      // Call the backend API with the formatted disease name
      const response = await getPredictionInfo({ disease_name: diseaseName });
      if (response && response.status === 'success') {
        setInfoData(response.disease_info);
      } else {
        setInfoData("No additional information available.");
      }
      setIsModalOpen(true);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">Prediction Result</h1>
        {predictionData ? (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-700">
              Status: <span className="text-green-600">{predictionData.status}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Prediction: <span className="text-green-600">{predictionData.result?.prediction || 'N/A'}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Confidence: <span className="text-green-600">{predictionData.result?.confidence ? (predictionData.result.confidence * 100).toFixed(2) + '%' : 'N/A'}</span>
            </p>
            <button 
              onClick={handleGetMoreInfo} 
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Get More Info
            </button>
          </div>
        ) : (
          <p className="text-red-500 text-center">No prediction available.</p>
        )}
      </div>

      {/* Modal for displaying additional information */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-3/4 overflow-y-auto">
            <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">More Information</h2>
            <div className="text-gray-700">
              <SyntaxHighlighter language="markdown" style={solarizedlight}>
                {infoData || "No additional information available."}
              </SyntaxHighlighter>
            </div>
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
