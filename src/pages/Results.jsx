import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/paddy.jpg'; // Update to your actual image path

const Results = () => {
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem('result');
    if (storedResult) {
      setPredictionData(JSON.parse(storedResult));
    }
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">Prediction Result</h1>
        {predictionData ? (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-700">Status: <span className="text-green-600">{predictionData.status}</span></p>
            <p className="text-lg font-semibold text-gray-700">
              Prediction: <span className="text-green-600">{predictionData.result?.prediction || 'N/A'}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Confidence: <span className="text-green-600">{predictionData.result?.confidence ? (predictionData.result.confidence * 100).toFixed(2) + '%' : 'N/A'}</span>
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-center">No prediction available.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
