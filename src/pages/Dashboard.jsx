import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import GigCard from '../components/gigs/GigCard';
import { formatCurrency, formatDate } from '../lib/utils';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Send,
  Bookmark,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';

export default function Dashboard() {
  const {
    currentUser,
    gigs,
    savedGigIds,
    submitWork,
    approveWork
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState('overview');
  const [successBanner, setSuccessBanner] = useState('');

  const myPostedGigs = gigs.filter(g => g.ownerId === currentUser.id);
  const myActiveWork = gigs.filter(g => g.assignedWorkerId === currentUser.id);
  const mySavedGigs = gigs.filter(g => savedGigIds.includes(g.id));

  const mySubmittedBids = gigs.flatMap(gig => 
    (gig.bids || [])
      .filter(bid => bid.bidderId === currentUser.id)
      .map(bid => ({ ...bid, gigTitle: gig.title, gigId: gig.id, gigBudget: gig.budget, gigStatus: gig.status }))
  );

  const totalEscrowHeld = myPostedGigs
    .filter(g => g.escrowStatus === 'HELD')
    .reduce((sum, g) => sum + g.budget, 0);

  const totalEarnings = myActiveWork
    .filter(g => g.status === 'COMPLETED')
    .reduce((sum, g) => sum + g.budget, 0);

  const handleSubmitWork = (gigId) => {
    submitWork(gigId);
    setSuccessBanner('Work has been formally submitted for client review.');
    setTimeout(() => setSuccessBanner(''), 4000);
  };

  const handleApproveWork = (gigId) => {
    approveWork(gigId);
    setSuccessBanner('Deliverables approved! Escrow payment released to the specialist.');
    setTimeout(() => setSuccessBanner(''), 4000);
  };

  return (
    <div className="w-full bg-slate-50/50 py-8 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>TaskProxi Platform</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Dual-role account overview &bull; Manage your posted gigs and contractor assignments in one place.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/post-gig"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Gig</span>
            </Link>
          </div>
        </div>

        {successBanner && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successBanner}</span>
          </div>
        )}

        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Simulated Escrow Held"
            value={formatCurrency(totalEscrowHeld)}
            subtext="Secured for active posted gigs"
            icon={ShieldCheck}
            color="blue"
          />
          <StatCard
            label="Active Posted Gigs"
            value={myPostedGigs.length}
            subtext={`${myPostedGigs.filter(g => g.status === 'OPEN').length} currently open for bids`}
            icon={FileText}
            color="indigo"
          />
          <StatCard
            label="Contractor Assignments"
            value={myActiveWork.length}
            subtext={`${myActiveWork.filter(g => g.status === 'IN_PROGRESS').length} in progress`}
            icon={Briefcase}
            color="amber"
          />
          <StatCard
            label="Proposals Submitted"
            value={mySubmittedBids.length}
            subtext="Active competitive bids"
            icon={Send}
            color="emerald"
          />
        </div>

        {/* Tabs Bar */}
        <div className="border-b border-slate-200 mb-6 flex overflow-x-auto space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'posted', label: `My Posted Gigs (${myPostedGigs.length})`, icon: FileText },
            { id: 'working', label: `My Active Work (${myActiveWork.length})`, icon: Briefcase },
            { id: 'bids', label: `My Submitted Bids (${mySubmittedBids.length})`, icon: Send },
            { id: 'saved', label: `Saved Gigs (${mySavedGigs.length})`, icon: Bookmark },
            { id: 'escrow', label: 'Simulated Escrow & Ledger', icon: DollarSign }
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

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Your Posted Gigs (Recent)</h3>
                  <button onClick={() => setActiveTab('posted')} className="text-xs font-semibold text-brand-600 hover:text-brand-800">
                    View All &rarr;
                  </button>
                </div>

                {myPostedGigs.length > 0 ? (
                  <div className="space-y-3">
                    {myPostedGigs.slice(0, 3).map(g => (
                      <div key={g.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
                        <div>
                          <Link to={`/gigs/${g.id}`} className="font-bold text-xs text-slate-900 hover:text-brand-600 line-clamp-1">
                            {g.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                            <StatusBadge status={g.status} size="sm" />
                            <span>&bull;</span>
                            <span>{g.bidsCount || 0} Proposals</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-xs text-slate-900">{formatCurrency(g.budget)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">You have not posted any gigs yet.</p>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Active Work As Contractor</h3>
                  <button onClick={() => setActiveTab('working')} className="text-xs font-semibold text-brand-600 hover:text-brand-800">
                    View All &rarr;
                  </button>
                </div>

                {myActiveWork.length > 0 ? (
                  <div className="space-y-3">
                    {myActiveWork.slice(0, 3).map(g => (
                      <div key={g.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
                        <div>
                          <Link to={`/gigs/${g.id}`} className="font-bold text-xs text-slate-900 hover:text-brand-600 line-clamp-1">
                            {g.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                            <StatusBadge status={g.status} size="sm" />
                            <span>&bull;</span>
                            <span>Due {g.deadline}</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-xs text-brand-700">{formatCurrency(g.budget)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400">
                    <p>No active assignments currently in progress.</p>
                    <Link to="/gigs" className="mt-2 inline-block text-brand-600 font-semibold hover:underline">
                      Explore gigs to submit proposals &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. POSTED GIGS TAB */}
        {activeTab === 'posted' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Gigs You've Posted</h3>
                <p className="text-xs text-slate-500">Manage client requests, review proposals, and approve completed deliverables.</p>
              </div>
              <Link to="/post-gig" className="px-3.5 py-1.5 rounded-lg bg-brand-600 text-white font-bold text-xs">
                + Post Another Gig
              </Link>
            </div>

            {myPostedGigs.length > 0 ? (
              <div className="space-y-4">
                {myPostedGigs.map(g => (
                  <div key={g.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/30 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={g.status} />
                          <span className="text-xs font-semibold text-slate-500">{g.category} &bull; {g.service}</span>
                        </div>
                        <Link to={`/gigs/${g.id}`} className="text-base font-bold text-slate-900 hover:text-brand-600 mt-1 block">
                          {g.title}
                        </Link>
                      </div>
                      <div className="text-right sm:flex-shrink-0">
                        <span className="text-base font-extrabold text-slate-900">{formatCurrency(g.budget)}</span>
                        <p className="text-[11px] text-slate-500">Escrow: <strong className="text-emerald-700">{g.escrowStatus}</strong></p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-200/60 text-xs text-slate-500 gap-2">
                      <div className="flex items-center gap-3">
                        <span>Bids Received: <strong className="text-slate-800">{g.bids?.length || 0}</strong></span>
                        <span>&bull;</span>
                        <span>Deadline: <strong className="text-slate-800">{formatDate(g.deadline)}</strong></span>
                      </div>

                      <div className="flex items-center gap-2">
                        {g.status === 'SUBMITTED' && (
                          <button
                            onClick={() => handleApproveWork(g.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                          >
                            Approve Work & Release Funds
                          </button>
                        )}
                        <Link
                          to={`/gigs/${g.id}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs"
                        >
                          View Gig & Proposals
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400">
                You haven't posted any gigs yet.
              </div>
            )}
          </div>
        )}

        {/* 3. ACTIVE WORK TAB */}
        {activeTab === 'working' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Your Active Contractor Assignments</h3>
              <p className="text-xs text-slate-500">Track progress, submit work for client review, and view payout state.</p>
            </div>

            {myActiveWork.length > 0 ? (
              <div className="space-y-4">
                {myActiveWork.map(g => (
                  <div key={g.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <StatusBadge status={g.status} />
                        <Link to={`/gigs/${g.id}`} className="text-base font-bold text-slate-900 hover:text-brand-600 mt-1 block">
                          {g.title}
                        </Link>
                        <p className="text-xs text-slate-500 mt-0.5">Poster: {g.owner?.name} &bull; Due: {formatDate(g.deadline)}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-brand-700">{formatCurrency(g.budget)}</span>
                        <p className="text-[10px] text-emerald-600 font-bold">Simulated Escrow Secured</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Link
                        to="/messages"
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100"
                      >
                        Message Client
                      </Link>
                      {g.status !== 'SUBMITTED' && g.status !== 'COMPLETED' && (
                        <button
                          onClick={() => handleSubmitWork(g.id)}
                          className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs"
                        >
                          Submit Work for Approval
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400">
                You have no active assignments. Explore the marketplace to bid!
              </div>
            )}
          </div>
        )}

        {/* 4. SUBMITTED BIDS */}
        {activeTab === 'bids' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Your Submitted Proposals</h3>
              <p className="text-xs text-slate-500">Track all competitive bids and their current review status.</p>
            </div>

            {mySubmittedBids.length > 0 ? (
              <div className="space-y-3">
                {mySubmittedBids.map(bid => (
                  <div key={bid.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <Link to={`/gigs/${bid.gigId}`} className="text-sm font-bold text-slate-900 hover:text-brand-600">
                        {bid.gigTitle}
                      </Link>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Your Bid: <strong className="text-slate-800">{formatCurrency(bid.amount)}</strong> &bull; Target Budget: {formatCurrency(bid.gigBudget)}
                      </p>
                      <p className="text-[11px] text-slate-600 italic mt-1 line-clamp-1">"{bid.proposal}"</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                        bid.status === 'ACCEPTED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-blue-50 text-brand-800 border-blue-200'
                      }`}>
                        {bid.status}
                      </span>
                      <Link to={`/gigs/${bid.gigId}`} className="text-xs font-semibold text-brand-600 hover:underline">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400">
                You have not submitted any bids yet.
              </div>
            )}
          </div>
        )}

        {/* 5. SAVED GIGS */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-slate-900">Bookmarked Gigs</h3>
            {mySavedGigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySavedGigs.map(g => (
                  <GigCard key={g.id} gig={g} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
                No bookmarked gigs.
              </div>
            )}
          </div>
        )}

        {/* 6. ESCROW LEDGER */}
        {activeTab === 'escrow' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Simulated Escrow Ledger
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                TaskProxi holds client funds in simulated escrow before assigning work and releases them upon verified sign-off.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
                <span className="text-xs font-semibold text-slate-500">Currently in Escrow Hold</span>
                <h4 className="text-2xl font-black text-brand-800 mt-1">{formatCurrency(totalEscrowHeld)}</h4>
              </div>
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xs font-semibold text-slate-500">Total Released Payouts</span>
                <h4 className="text-2xl font-black text-emerald-800 mt-1">{formatCurrency(totalEarnings)}</h4>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-500">Disputed / Frozen</span>
                <h4 className="text-2xl font-black text-slate-700 mt-1">$0</h4>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
