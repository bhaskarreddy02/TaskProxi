import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import StatusBadge from '../components/common/StatusBadge';
import RatingStars from '../components/common/RatingStars';
import UserAvatar from '../components/common/UserAvatar';
import BidModal from '../components/gigs/BidModal';
import { formatCurrency, formatDate } from '../lib/utils';
import {
  MapPin,
  Globe,
  Clock,
  Bookmark,
  Users,
  ShieldCheck,
  Send,
  Flag,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Lock
} from 'lucide-react';

export default function GigDetails() {
  const { id } = useParams();
  const { gigs, currentUser, isGigSaved, toggleSaveGig, acceptBid } = useMarketplace();

  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportedSuccess, setReportedSuccess] = useState(false);

  const gig = gigs.find(g => g.id === id) || gigs[0];
  const isSaved = isGigSaved(gig.id);
  const isOwner = gig.ownerId === currentUser.id;

  const similarGigs = gigs
    .filter(g => g.categoryId === gig.categoryId && g.id !== gig.id)
    .slice(0, 3);

  const handleAcceptBid = (bidId) => {
    acceptBid(gig.id, bidId);
  };

  return (
    <div className="w-full bg-slate-50/50 py-8 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Breadcrumb Trail */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/gigs" className="hover:text-brand-600">Browse Gigs</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-700 font-medium">{gig.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{gig.subcategory}</span>
        </nav>

        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-700 border border-blue-200">
                  {gig.service || gig.subcategory}
                </span>
                <StatusBadge status={gig.status} size="lg" />
                {gig.escrowStatus === 'HELD' && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" /> Escrow Protected
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {gig.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1">
                  {gig.type === 'remote' ? (
                    <span className="flex items-center gap-1 text-brand-700 font-medium">
                      <Globe className="w-4 h-4 text-brand-500" /> Fully Remote / Digital
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-4 h-4 text-slate-400" /> {gig.location} ({gig.travelRadius || 'Local Area'})
                    </span>
                  )}
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Deadline: <strong className="text-slate-700">{formatDate(gig.deadline)}</strong></span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>Workers Needed: <strong className="text-slate-700">{gig.requiredWorkers || 1}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Pricing Box */}
            <div className="lg:w-80 bg-slate-50/80 rounded-xl p-5 border border-slate-200 flex flex-col justify-between flex-shrink-0">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Posted Budget</span>
                <div className="text-3xl font-extrabold text-slate-900 mt-0.5">
                  {formatCurrency(gig.budget)}
                </div>
                
                <div className="mt-2.5 p-2.5 bg-blue-50/80 border border-blue-100 rounded-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Minimum Bid Floor (80%):</span>
                    <span className="font-extrabold text-brand-700">
                      {formatCurrency(gig.minimumBidFloor || gig.budget * 0.8)}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                    Server-enforced floor prevents race-to-the-bottom underbidding.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {!isOwner ? (
                  <button
                    onClick={() => setBidModalOpen(true)}
                    className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Bid on Gig</span>
                  </button>
                ) : (
                  <div className="p-2.5 bg-slate-200/60 rounded-lg text-xs font-semibold text-slate-700 text-center">
                    You are the poster of this gig.
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveGig(gig.id)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      isSaved
                        ? "bg-brand-50 border-brand-300 text-brand-700"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-brand-600 text-brand-600" : ""}`} />
                    <span>{isSaved ? "Bookmarked" : "Save"}</span>
                  </button>
                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="py-2 px-3 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-500 text-xs font-semibold transition-colors"
                    title="Report Gig"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Scope of Work & Requirements
                </h3>
                <p className="text-sm text-slate-700 mt-4 leading-relaxed whitespace-pre-line">
                  {gig.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                  Required Competencies & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gig.requiredSkills?.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <Lock className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">TaskProxi Guarantee:</strong> For on-site and remote work, payments are held in simulated escrow and released only when deliverables are verified.
                </div>
              </div>
            </div>

            {/* Submitted Bids */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Received Proposals ({gig.bids?.length || 0})
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isOwner ? "Review bidders side-by-side and select any proposal." : "Proposals submitted by verified contractors."}
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-100">
                  Floor: {formatCurrency(gig.minimumBidFloor || gig.budget * 0.8)}
                </span>
              </div>

              {gig.bids && gig.bids.length > 0 ? (
                <div className="space-y-4">
                  {gig.bids.map((bid) => (
                    <div
                      key={bid.id}
                      className={`p-5 rounded-xl border transition-all ${
                        bid.status === 'ACCEPTED'
                          ? "border-emerald-300 bg-emerald-50/50"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50/30"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <UserAvatar user={{ name: bid.bidderName, avatar: bid.bidderAvatar, verified: true }} size="md" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{bid.bidderName}</span>
                              {bid.status === 'ACCEPTED' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  Accepted
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                              <RatingStars rating={bid.bidderRating} size="sm" />
                              <span>&bull;</span>
                              <span>Category Rating: <strong>{bid.categoryRating || 4.9}</strong></span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right sm:flex-shrink-0">
                          <span className="text-lg font-extrabold text-slate-900">{formatCurrency(bid.amount)}</span>
                          <p className="text-[10px] text-slate-500">Est. {bid.estimatedDays || 1} day(s)</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 mt-3 bg-white p-3 rounded-lg border border-slate-100 leading-relaxed">
                        "{bid.proposal}"
                      </p>

                      {isOwner && gig.status === 'OPEN' && bid.status !== 'ACCEPTED' && (
                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleAcceptBid(bid.id)}
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                          >
                            Accept Bid & Assign
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500">No proposals submitted yet.</p>
                  <p className="text-xs text-slate-400 mt-1">Be the first verified specialist to submit a proposal!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Gig Poster Details
              </h3>

              <div className="flex items-center gap-3">
                <UserAvatar user={gig.owner} size="lg" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{gig.owner?.name}</h4>
                  <p className="text-xs text-slate-500">Member since 2024</p>
                  <div className="mt-1">
                    <RatingStars rating={gig.owner?.rating} count={gig.owner?.reviewsCount} size="sm" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Completion</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">100%</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Response</p>
                  <p className="text-sm font-bold text-brand-700 mt-0.5">&lt; 1 hr</p>
                </div>
              </div>

              <Link
                to={`/profile/${gig.ownerId || gig.owner?.id}`}
                className="w-full block text-center py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                View Full User Profile
              </Link>
            </div>

            {similarGigs.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Similar Gigs You May Like
                </h3>
                <div className="space-y-3">
                  {similarGigs.map(sim => (
                    <Link
                      key={sim.id}
                      to={`/gigs/${sim.id}`}
                      className="block p-3 rounded-xl border border-slate-100 hover:border-brand-300 hover:bg-slate-50/50 transition-all"
                    >
                      <h5 className="font-bold text-xs text-slate-900 hover:text-brand-600 line-clamp-1">
                        {sim.title}
                      </h5>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                        <span className="font-bold text-slate-800">{formatCurrency(sim.budget)}</span>
                        <span>{sim.type === 'remote' ? 'Remote' : sim.location}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      <BidModal
        gig={gig}
        isOpen={bidModalOpen}
        onClose={() => setBidModalOpen(false)}
      />

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            {reportedSuccess ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Report Submitted for Admin Investigation</h4>
                <p className="text-xs text-slate-500">Our Trust & Safety moderators will evaluate this gig according to community guidelines.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                  <h4 className="font-bold text-sm">Report Suspicious Gig</h4>
                </div>
                <p className="text-xs text-slate-500">Select reason for platform investigation:</p>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="report_reason" defaultChecked />
                    <span>Attempt to move payment off-platform</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="report_reason" />
                    <span>Fake / Duplicate / Scam Listing</span>
                  </label>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setReportModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setReportedSuccess(true);
                      setTimeout(() => {
                        setReportedSuccess(false);
                        setReportModalOpen(false);
                      }, 1500);
                    }}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded shadow-xs"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
