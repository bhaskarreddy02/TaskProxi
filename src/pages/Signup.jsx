import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { User, Mail, Lock, MapPin, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { authService } from '../services/dbServices';

export default function Signup() {
  const navigate = useNavigate();
  const { switchUser, isDatabaseConnected } = useMarketplace();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Seattle, WA');
  const [primaryInterest, setPrimaryInterest] = useState('both');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isDatabaseConnected) {
        const { user, error } = await authService.signUp({
          email,
          password,
          name,
          role: primaryInterest === 'work' ? 'worker_primary' : 'poster_primary'
        });

        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }

        if (user) {
          switchUser(user.id);
        }
      }

      setLoading(false);
      navigate('/verify');
    } catch (err) {
      setErrorMsg(err.message || 'Signup failed');
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
            Create your TaskProxi Account
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            One universal account: Post gigs today, bid on projects tomorrow.
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

        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-brand-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>No Role Lock-In:</strong> TaskProxi does not separate users into "only client" or "only freelancer". Your verified reputation follows you across every category.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Legal Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Jordan Smith"
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="jordan@example.com"
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Primary Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State / Remote"
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              What do you plan to do most?
            </label>
            <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setPrimaryInterest('both')}
                className={`py-2 rounded-lg border text-center ${
                  primaryInterest === 'both' ? 'bg-brand-50 text-brand-800 border-brand-300' : 'border-slate-200 text-slate-600'
                }`}
              >
                Both Hire & Work
              </button>
              <button
                type="button"
                onClick={() => setPrimaryInterest('work')}
                className={`py-2 rounded-lg border text-center ${
                  primaryInterest === 'work' ? 'bg-brand-50 text-brand-800 border-brand-300' : 'border-slate-200 text-slate-600'
                }`}
              >
                Find Gig Work
              </button>
              <button
                type="button"
                onClick={() => setPrimaryInterest('post')}
                className={`py-2 rounded-lg border text-center ${
                  primaryInterest === 'post' ? 'bg-brand-50 text-brand-800 border-brand-300' : 'border-slate-200 text-slate-600'
                }`}
              >
                Post Gigs
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account...' : 'Create Free Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 font-bold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
