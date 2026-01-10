import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DocumentLibrary from './pages/DocumentLibrary';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Team from './pages/Team';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout><Outlet /></Layout>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<DocumentLibrary />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/uploads" element={<Upload />} />
        <Route path="/team" element={<Team />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch-all redirect to Landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const AppWithRouter: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-[#0F1123]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppWithRouter />
    </AuthProvider>
  );
};

export default App;