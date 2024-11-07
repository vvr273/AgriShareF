import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictDisease } from '../utills/api'; // Ensure your API file path is correct
import backgroundImage from '../assets/paddy.jpg'; // Add your background image path here

const UploadPreview = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const navigate = useNavigate();

  // Handle file selection and generate preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  // Handle form submission to send image to backend API
  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await predictDisease(formData);
      console.log(response);

      // Store the response in local storage
      localStorage.setItem('result', JSON.stringify(response));

      // Navigate to Results page with API response
      navigate('/results', { state: { result: response } });
    } catch (error) {
      console.error("Error predicting disease:", error);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">Upload Image Preview</h1>
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="mb-4 border border-gray-300 p-2 rounded"
        />
        
        {previewURL && (
          <div className="flex flex-col items-center mb-4">
            <img 
              src={previewURL} 
              alt="Selected file preview" 
              className="w-full max-w-lg rounded-lg shadow-md mb-4" 
            />
            <button 
              onClick={handleSubmit} 
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPreview;
