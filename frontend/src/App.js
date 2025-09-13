import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

// Components
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Dashboard from "./pages/Dashboard";
import MyPlaces from "./pages/MyPlaces";
import Market from "./pages/Market";
import Community from "./pages/Community";
import Wars from "./pages/Wars";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and validate token
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('europaUser');
      const token = localStorage.getItem('europaToken');
      
      if (savedUser && token) {
        try {
          // Verify token with backend
          const response = await axios.get(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Token validation failed:', error);
          // Clear invalid token/user data
          localStorage.removeItem('europaUser');
          localStorage.removeItem('europaToken');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const response = await axios.post(`${API}/auth/login`, loginData);
      const { user, access_token } = response.data;
      
      // Store token and user data
      localStorage.setItem('europaToken', access_token);
      localStorage.setItem('europaUser', JSON.stringify(user));
      
      setUser(user);
      toast.success(`Welcome back, ${user.username}!`);
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.detail || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleRegister = async (registrationData) => {
    try {
      const response = await axios.post(`${API}/auth/register`, registrationData);
      const { user, access_token } = response.data;
      
      // Store token and user data
      localStorage.setItem('europaToken', access_token);
      localStorage.setItem('europaUser', JSON.stringify(user));
      
      setUser(user);
      toast.success(`Welcome to Europa, ${user.username}!`);
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.detail || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('europaUser');
    localStorage.removeItem('europaToken');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Europa...</div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-slate-900">
      <BrowserRouter>
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                !user ? (
                  <LandingPage onRegister={handleRegister} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/my-places/*" 
              element={user ? <MyPlaces user={user} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/market/*" 
              element={user ? <Market user={user} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/community/*" 
              element={user ? <Community user={user} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/wars" 
              element={user ? <Wars user={user} /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;