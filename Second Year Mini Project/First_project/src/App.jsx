import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Layout and Page Components
import Layout from './components/Layout';
import LandingPage from './pages/Landingpage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/ProfilePage';   // If you have one

import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import ChatPage from './pages/ChatPage';
import AIChatPage from './pages/AIChatPage';
import AdminLogin from './pages/AdminLogin';
import ResourcesPage from './pages/ResourcesPage';
import VideoListPage from './pages/VideoListPage';
import AppointmentsPage from './pages/AppointmentsPage';

import SettingsPage from './pages/SettingsPage';

function App() {
  // User state: null (logged out) or true (logged in)
  const [user, setUser] = useState(true);
  const handleLogin = () => {
    setUser(true);
  };
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              user={user}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />
          <Route
              path="profile"
              element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />}
            />
          <Route
            path="assessment" 
            element={user ? <Assessment /> : <Navigate to="/login" />}
          />
          <Route
            path="appointments"
            element={user ? <AppointmentsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="settings"
            element={user ? <SettingsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="chat"
            element={user ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="chatbot"
            element={user ? <AIChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="adminLogin"
            element={user ? <AdminLogin /> : <Navigate to="/login" />}
          />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="resources/:categorySlug" element={<VideoListPage />} />


        </Route>
          

      </Routes>
    </BrowserRouter>
  );
}

export default App;


{/* <Light_Dark toggle={toggle} setToggle={setToggle} /> */ }
// import Light_Dark from './ui/Light_Dark';
