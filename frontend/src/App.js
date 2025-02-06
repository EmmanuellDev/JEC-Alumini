import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Donate from './components/Donate';
import Settings from './components/Settings';
import PaymentHistory from './components/PayHistory';
import GenerateID from './components/GenerateID';

function App() {
  return (
    <Router>
      <div className=" min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/payments" element={<PaymentHistory />} />
          <Route path="/your-id" element={<GenerateID />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
