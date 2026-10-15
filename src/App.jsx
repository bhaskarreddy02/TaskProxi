import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import BrowseGigs from './pages/BrowseGigs';
import GigDetails from './pages/GigDetails';
import PostGig from './pages/PostGig';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import AvailabilityPage from './pages/AvailabilityPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyAccount from './pages/VerifyAccount';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
  return (
    <MarketplaceProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gigs" element={<BrowseGigs />} />
            <Route path="/gigs/:id" element={<GigDetails />} />
            <Route path="/post-gig" element={<PostGig />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/availability" element={<AvailabilityPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<VerifyAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MarketplaceProvider>
  );
}
