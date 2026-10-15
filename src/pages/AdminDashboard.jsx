import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import StatCard from '../components/common/StatCard';
import { formatCurrency, formatDate } from '../lib/utils';
import {
  ShieldAlert,
  Scale,
  Layers,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Users,
  DollarSign,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    adminStats,
    disputes,
    resolveDispute,
    riskFlags,
    dismissRiskFlag,
    auditLogs,
    categories,
    currentUser
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState('disputes');
  const [resolutionMessage, setResolutionMessage] = useState('');

  const handleResolve = (disputeId, outcome) => {
    resolveDispute(disputeId, outcome);
    setResolutionMessage(`Dispute #${disputeId} successfully resolved (${outcome}) and recorded to audit log.`);
    setTimeout(() => setResolutionMessage(''), 4000);
  };

  return (
    <div className="w-full bg-slate-50/50 py-8 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>TaskProxi Internal</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">Administration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-brand-700" /> Admin Moderation & Trust Center
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Platform-wide dispute arbitration, trust & safety risk evaluation, and taxonomy management.
            </p>
          </div>

          <div className="p-2.5 bg-brand-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Moderator: {currentUser.name}</span>
          </div>
        </div>

        {resolutionMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{resolutionMessage}</span>
          </div>
        )}

        {/* Top KPIs Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Active Marketplace Escrow"
            value={formatCurrency(adminStats.simulatedEscrowHeld)}
            subtext="Secured across all active gigs"
            icon={DollarSign}
            color="emerald"
          />
          <StatCard
            label="Pending Disputes"
            value={disputes.filter(d => d.status === 'UNDER_REVIEW').length}
            subtext="Awaiting admin adjudication"
            icon={Scale}
            color="amber"
          />
          <StatCard
            label="Trust & Safety Risk Flags"
            value={riskFlags.filter(r => r.status === 'PENDING_REVIEW').length}
            subtext="Collusion / Shadow injection"
            icon={AlertTriangle}
            color="blue"
          />
          <StatCard
            label="Registered Accounts"
            value={adminStats.activeUsers}
            subtext="Dual-role participant accounts"
            icon={Users}
            color="indigo"
          />
        </div>

        {/* Tabs Bar */}
        <div className="border-b border-slate-200 mb-6 flex overflow-x-auto space-x-1">
          {[
            { id: 'disputes', label: `Dispute Arbitration (${disputes.length})`, icon: Scale },
            { id: 'risks', label: `Risk Flags Queue (${riskFlags.length})`, icon: AlertTriangle },
            { id: 'taxonomy', label: `Taxonomy Manager (${categories.length})`, icon: Layers },
            { id: 'audit', label: `Immutable Audit Log (${auditLogs.length})`, icon: FileCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-brand-600 text-brand-700 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DISPUTES */}
        {activeTab === 'disputes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
              <h3 className="text-base font-bold text-slate-900 mb-1">Active Dispute Arbitrations</h3>
              <p className="text-xs text-slate-500 mb-6">
                When disputes occur, escrow funds are frozen (SRS Rule 20) until an admin reviews evidence and chooses an outcome.
              </p>

              <div className="space-y-4">
                {disputes.map(disp => (
                  <div key={disp.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-500">{disp.id}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            disp.status === 'UNDER_REVIEW'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {disp.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 mt-1">{disp.gigTitle}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Raised by: <strong>{disp.raisedByName}</strong> vs Contractor: <strong>{disp.respondentName}</strong>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-black text-slate-900">{formatCurrency(disp.amount)}</span>
                        <p className="text-[10px] text-rose-600 font-bold">Escrow Frozen</p>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                      <strong className="text-slate-800">Reason for Dispute:</strong>
                      <p className="text-slate-600 mt-0.5 italic">"{disp.reason}"</p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Preserved Evidence ({disp.evidenceCount} Files):
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {disp.evidence?.map((file, i) => (
                          <span key={i} className="text-xs bg-slate-100 border border-slate-200 px-2.5 py-1 rounded text-slate-700 font-mono flex items-center gap-1">
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                            {file.name} ({file.size})
                          </span>
                        ))}
                      </div>
                    </div>

                    {disp.status === 'UNDER_REVIEW' && (
                      <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-end gap-2">
                        <button
                          onClick={() => handleResolve(disp.id, 'RESOLVED_WORKER')}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                        >
                          Release Full Escrow to Worker
                        </button>
                        <button
                          onClick={() => handleResolve(disp.id, 'RESOLVED_POSTER')}
                          className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs"
                        >
                          Refund Full Amount to Client
                        </button>
                        <button
                          onClick={() => handleResolve(disp.id, 'PARTIAL_SPLIT')}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold"
                        >
                          Split 50/50 Partial Release
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RISK FLAGS */}
        {activeTab === 'risks' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
              <h3 className="text-base font-bold text-slate-900 mb-1">Trust & Safety Suspicious Pattern Queue</h3>
              <p className="text-xs text-slate-500 mb-6">
                Automated detection flags potential market manipulation, collusive bidding, or shadow injections for manual review.
              </p>

              <div className="space-y-3">
                {riskFlags.map(rf => (
                  <div key={rf.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/30">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500">{rf.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          rf.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {rf.riskLevel} RISK
                        </span>
                        <span className="text-xs font-bold text-slate-700">{rf.targetType}: {rf.targetTitle}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{rf.flagReason}</p>
                    </div>

                    <div className="flex items-center gap-2 sm:flex-shrink-0">
                      {rf.status === 'PENDING_REVIEW' ? (
                        <>
                          <button
                            onClick={() => dismissRiskFlag(rf.id)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                          >
                            Dismiss (False Positive)
                          </button>
                          <button
                            onClick={() => dismissRiskFlag(rf.id)}
                            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                          >
                            Suspend & Block
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">Resolved</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TAXONOMY MANAGER */}
        {activeTab === 'taxonomy' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Taxonomy Manager</h3>
                <p className="text-xs text-slate-500">Categories, subcategories, and services are dynamically admin-manageable without redeploying code.</p>
              </div>
            </div>

            <div className="space-y-4">
              {categories.map(cat => (
                <div key={cat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-slate-900">{cat.name}</h4>
                    <span className="text-xs text-slate-500">{cat.subcategories.length} Subcategories</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {cat.subcategories.map(sub => (
                      <div key={sub.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                        <span className="font-semibold text-slate-800">{sub.name}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {sub.services.length} services configured
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: IMMUTABLE AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Immutable Audit Log</h3>
              <p className="text-xs text-slate-500">Append-only trail recording all administrative suspensions, dispute rulings, and security actions.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase tracking-wider">
                    <th className="p-3">Log ID</th>
                    <th className="p-3">Actor</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Target</th>
                    <th className="p-3">Details</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/60">
                      <td className="p-3 font-mono font-bold text-slate-600">{log.id}</td>
                      <td className="p-3 font-semibold text-slate-900">{log.actor}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-brand-800 font-bold">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3 text-slate-700">{log.target}</td>
                      <td className="p-3 text-slate-500">{log.details}</td>
                      <td className="p-3 text-slate-400 whitespace-nowrap">{formatDate(log.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
