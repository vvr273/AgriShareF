import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const history = useNavigate();

  // Start video stream when component mounts
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startVideo();
  }, []);

  // Capture image from video
  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    setCapturedImage(canvasRef.current.toDataURL('image/png'));
  };

  // Go to results page with captured image
  const handlePredict = () => {
    if (capturedImage) {
      history('/results', {
        state: { image: capturedImage }
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-200 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Live Camera</h1>
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg rounded-lg shadow-md mb-4" />
      <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />

      {capturedImage ? (
        <div className="flex flex-col items-center">
          <img src={capturedImage} alt="Captured" className="w-full max-w-lg rounded-lg shadow-md mb-4" />
          <button 
            onClick={handlePredict} 
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Predict
          </button>
        </div>
      ) : (
        <button 
          onClick={handleCapture} 
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Capture
        </button>
      )}
    </div>
  );
};

export default CameraCapture;
