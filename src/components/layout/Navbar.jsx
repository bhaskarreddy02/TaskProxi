import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import UserAvatar from '../common/UserAvatar';
import Logo from '../common/Logo';
import {
  Search,
  PlusCircle,
  Bell,
  MessageSquare,
  Calendar,
  LayoutDashboard,
  Shield,
  Menu,
  X,
  ChevronDown,
  Layers,
  Sparkles,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, switchUser, allUsers, unreadNotificationsCount, isDatabaseConnected } = useMarketplace();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/gigs?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
    }
  };

  const navLinks = [
    { name: "Browse Gigs", path: "/gigs" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Messages", path: "/messages" },
    { name: "Availability", path: "/availability" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/90 shadow-sm">
      {/* Top micro-announcement banner */}
      <div className="bg-brand-900 text-white text-xs py-1 px-4 sm:px-8 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          {isDatabaseConnected ? (
            <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Supabase DB Connected
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-200">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
              Demo Mode (Local DB)
            </span>
          )}
          <span className="hidden sm:inline text-slate-400">&bull;</span>
          <span className="hidden sm:inline text-slate-300">Simulated Escrow Protection</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/admin" className="hover:text-brand-200 transition-colors flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> Admin Panel
          </Link>
          <span className="text-slate-400">|</span>
          <span className="text-brand-100">80% Fair-Wage Bid Floor Enforced</span>
        </div>
      </div>

      {/* Main Full-Screen Navbar */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-6">
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-brand-700 bg-brand-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search gigs (e.g. plumbing, React, moving, bartending)..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 rounded-full border border-slate-200 focus:border-brand-500 focus:outline-none transition-all shadow-inner"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </form>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            
            {/* Post a Gig Button */}
            <Link
              to="/post-gig"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-sm transition-all hover:shadow"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post a Gig</span>
            </Link>

            {/* Notification Bell */}
            <Link
              to="/notifications"
              className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>

            {/* Persona Switcher & Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 border border-slate-200 hover:border-slate-300 rounded-full bg-slate-50 hover:bg-white transition-all text-left"
              >
                <div className="hidden xl:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-brand-700 font-medium capitalize">
                    {currentUser.role === 'admin' ? 'Platform Admin' : 'Poster & Worker'}
                  </span>
                </div>
                <UserAvatar user={currentUser} size="sm" />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Logged in as</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                  </div>

                  {/* Active Persona Switching Section */}
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-[11px] text-brand-700 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Quick Switch Persona
                    </p>
                    <div className="space-y-1">
                      {allUsers.map(user => (
                        <button
                          key={user.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            switchUser(user.id);
                            setUserMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors ${
                            user.id === currentUser.id
                              ? "bg-brand-50 text-brand-800 font-semibold border border-brand-200"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <span className="truncate">{user.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700">
                            {user.role === 'admin' ? 'Admin' : user.headline.split('&')[0].trim()}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Profile Links */}
                  <div className="py-1">
                    <Link
                      to={`/profile/${currentUser.id}`}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <UserCheck className="w-4 h-4 text-slate-400" /> View My Public Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" /> User Dashboard
                    </Link>
                    {currentUser.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-brand-700 font-medium hover:bg-brand-50"
                      >
                        <Shield className="w-4 h-4 text-brand-600" /> Admin Control Center
                      </Link>
                    )}
                    <Link
                      to="/login"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <LogOut className="w-4 h-4 text-slate-400" /> Sign Out / Switch
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-2">
            <form onSubmit={handleSearchSubmit} className="relative px-2 mb-3">
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search gigs..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-sm border border-slate-200"
              />
              <Search className="absolute left-5 top-2.5 w-4 h-4 text-slate-400" />
            </form>

            <div className="grid grid-cols-1 gap-1 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-brand-700 bg-brand-50"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
