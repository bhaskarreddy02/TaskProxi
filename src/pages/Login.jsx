import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { authService } from '../services/dbServices';

export default function Login() {
  const navigate = useNavigate();
  const { allUsers, switchUser, isDatabaseConnected } = useMarketplace();

  const [email, setEmail] = useState('pooja.reddy@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isDatabaseConnected) {
        const { data, error } = await authService.signIn({ email, password });
        if (error) {
          // If login fails via Supabase auth, inform user or check if demo user
          const matched = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
          if (matched) {
            switchUser(matched.id);
            setLoading(false);
            navigate('/dashboard');
            return;
          }
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }

        if (data?.user) {
          switchUser(data.user.id);
        }
      } else {
        const matched = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || allUsers[0];
        switchUser(matched.id);
      }

      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-subtle space-y-6">
        
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-sm">
            T
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign in to TaskProxi
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            One account to post gigs, submit bids, and manage escrow payouts.
          </p>
          {isDatabaseConnected && (
            <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Supabase DB Connected
            </span>
          )}
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs space-y-2">
          <span className="font-bold text-brand-900 block">Quick Demo Logins:</span>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => { setEmail('pooja.reddy@example.com'); }}
              className="p-1.5 bg-white border border-blue-200 rounded text-left font-medium text-slate-700 hover:bg-brand-50"
            >
              Pooja (Client/Poster)
            </button>
            <button
              type="button"
              onClick={() => { setEmail('rajesh.plumbing@example.com'); }}
              className="p-1.5 bg-white border border-blue-200 rounded text-left font-medium text-slate-700 hover:bg-brand-50"
            >
              Rajesh (Plumber/Worker)
            </button>
            <button
              type="button"
              onClick={() => { setEmail('ananya.codes@example.com'); }}
              className="p-1.5 bg-white border border-blue-200 rounded text-left font-medium text-slate-700 hover:bg-brand-50"
            >
              Ananya (Developer)
            </button>
            <button
              type="button"
              onClick={() => { setEmail('admin@taskproxi.in'); }}
              className="p-1.5 bg-white border border-blue-200 rounded text-left font-medium text-slate-700 hover:bg-brand-50"
            >
              Arjun (Admin/Trust)
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" className="text-[11px] text-brand-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Signing in...' : 'Sign In to Marketplace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
          Don't have a TaskProxi account yet?{' '}
          <Link to="/signup" className="text-brand-600 font-bold hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
}
