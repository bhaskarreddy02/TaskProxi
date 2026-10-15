import React from 'react';

export default function StatCard({ label, value, subtext, icon: Icon, trend, color = "blue" }) {
  const colorStyles = {
    blue: "bg-blue-50/70 text-brand-700 border-blue-100",
    emerald: "bg-emerald-50/70 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50/70 text-amber-700 border-amber-100",
    indigo: "bg-indigo-50/70 text-indigo-700 border-indigo-100"
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-subtle flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        {subtext && (
          <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
            {trend && (
              <span className={`font-semibold ${trend > 0 ? 'text-emerald-600' : 'text-slate-600'}`}>
                {trend > 0 ? `+${trend}%` : `${trend}%`}
              </span>
            )}
            {subtext}
          </p>
        )}
      </div>

      {Icon && (
        <div className={`p-2.5 rounded-lg border ${colorStyles[color] || colorStyles.blue}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
