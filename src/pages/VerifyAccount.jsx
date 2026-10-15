import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function VerifyAccount() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['5', '2', '9', '', '', '']);
  const [verified, setVerified] = useState(false);

  const handleInput = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setVerified(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-subtle text-center space-y-6">
        
        <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-200">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Verify Your Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            We sent a 6-digit confirmation code to your email. Enter the code below to unlock verified badge status.
          </p>
        </div>

        {verified ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Account Verified! Redirecting to dashboard...</span>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInput(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-600 shadow-xs"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm & Activate Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-slate-400">
              Didn't receive code? <button type="button" className="text-brand-600 font-semibold hover:underline">Resend Code</button>
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
