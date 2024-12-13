import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import ProtectedScreen from './components/ProtectedScreen';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/protected" element={<ProtectedScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
