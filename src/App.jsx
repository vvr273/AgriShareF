import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CropPrediction from './pages/CropPrediction';
import ProtectedRoute from './pages/ProtectedRoute'; // Import ProtectedRoute

import DiseaseManagement  from './pages/DiseaseManagement'
import CameraCapture from './pages/CameraCapture';
import Results from './pages/Results';
import UploadPreview from './pages/UploadPreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ResetPassword' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/DiseaseManagement' element={<DiseaseManagement />} />
        <Route path='/CameraCapture' element={<CameraCapture />} />
        <Route path='/results' element={<Results />} />
        <Route path='/upload' element={<UploadPreview />} />



        {/* Protected Routes */}
        <Route path='/Dashboard' element={<ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
        <Route path='/CropPrediction' element={<ProtectedRoute>
            <CropPrediction />
          </ProtectedRoute>} />

        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
