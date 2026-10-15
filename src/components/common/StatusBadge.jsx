import React from 'react';

const STATUS_CONFIGS = {
  OPEN: {
    label: "Open for Bids",
    bg: "bg-blue-50 text-brand-700 border-brand-200",
    dot: "bg-brand-600"
  },
  BIDDING: {
    label: "Bidding Active",
    bg: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-600"
  },
  ASSIGNED: {
    label: "Assigned",
    bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-600"
  },
  IN_PROGRESS: {
    label: "In Progress",
    bg: "bg-brand-50 text-brand-800 border-brand-200",
    dot: "bg-brand-600"
  },
  SUBMITTED: {
    label: "Review Pending",
    bg: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-500"
  },
  COMPLETED: {
    label: "Completed",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-600"
  },
  DISPUTED: {
    label: "Disputed",
    bg: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-600"
  },
  CANCELLED: {
    label: "Cancelled",
    bg: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-500"
  },
  EXPIRED: {
    label: "Expired",
    bg: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400"
  }
};

export default function StatusBadge({ status = "OPEN", size = "sm" }) {
  const config = STATUS_CONFIGS[status] || STATUS_CONFIGS.OPEN;
  const padding = size === "lg" ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs";

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${padding}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
