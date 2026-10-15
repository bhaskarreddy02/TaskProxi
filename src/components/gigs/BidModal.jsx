import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import Modal from '../common/Modal';
import { formatCurrency } from '../../lib/utils';
import { ShieldCheck, AlertCircle, CheckCircle2, UploadCloud, Clock, DollarSign } from 'lucide-react';

export default function BidModal({ gig, isOpen, onClose, onSuccess }) {
  const { currentUser, submitBid } = useMarketplace();

  const minFloor = gig?.minimumBidFloor || Math.round((gig?.budget || 0) * 0.8);
  const [amount, setAmount] = useState(gig?.budget ? String(gig.budget) : '');
  const [proposal, setProposal] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('2');
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const numAmount = Number(amount) || 0;
  const isBelowFloor = numAmount > 0 && numAmount < minFloor;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!amount || numAmount <= 0) {
      setError('Please enter a valid bid amount.');
      return;
    }

    if (numAmount < minFloor) {
      setError(`Bid rejected: Amount ($${numAmount}) is below the minimum allowed bid floor of $${minFloor} (80% of gig budget).`);
      return;
    }

    if (!proposal.trim() || proposal.trim().length < 20) {
      setError('Please write a proposal of at least 20 characters detailing how you will complete the work.');
      return;
    }

    try {
      submitBid(gig.id, {
        amount: numAmount,
        proposal: proposal.trim(),
        estimatedDays: Number(estimatedDays) || 1
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMockUpload = () => {
    setAttachments(prev => [...prev, `portfolio_sample_${prev.length + 1}.pdf`]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit a Bid"
      subtitle={`Propose your terms for "${gig?.title}"`}
      maxWidth="max-w-lg"
    >
      {success ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">Bid Submitted Successfully!</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            The gig owner has received your proposal. You will be notified if they accept your bid or send a counter-offer.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Gig budget & Floor Explanation Card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-medium">Gig Target Budget:</span>
              <span className="font-bold text-slate-800">{formatCurrency(gig?.budget || 0)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Enforced 80% Bid Floor:</span>
              <span className="font-bold text-brand-700">{formatCurrency(minFloor)}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 border-t border-slate-200/60 pt-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
              TaskProxi prevents predatory underbidding. Bids below {formatCurrency(minFloor)} are rejected.
            </p>
          </div>

          {/* Bid Amount Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Bid Amount ($ USD) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                min={minFloor}
                step="5"
                placeholder={String(minFloor)}
                className={`w-full pl-8 pr-4 py-2 text-sm font-semibold rounded-lg border ${
                  isBelowFloor
                    ? "border-rose-400 bg-rose-50 text-rose-900 focus:border-rose-500"
                    : "border-slate-200 bg-white text-slate-900 focus:border-brand-500"
                } focus:outline-none`}
              />
            </div>
            
            {/* Live Floor Alert */}
            {isBelowFloor && (
              <p className="text-xs text-rose-600 font-medium mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                Amount is below the minimum allowed floor of {formatCurrency(minFloor)}.
              </p>
            )}
          </div>

          {/* Estimated Completion Time */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Estimated Completion Days *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400">
                <Clock className="w-4 h-4" />
              </span>
              <input
                type="number"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(e.target.value)}
                min="1"
                max="90"
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Proposal Cover Text */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Proposal & Qualifications *
            </label>
            <textarea
              rows="4"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="Introduce your relevant experience, tools/equipment you will bring, and your plan to execute this gig..."
              className="w-full p-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500 leading-relaxed"
            />
            <span className="text-[10px] text-slate-400">
              Minimum 20 characters. Detail your qualifications clearly.
            </span>
          </div>

          {/* Attachments Upload Mock */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Attachments (Certificates, Portfolio, Work Samples)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleMockUpload}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
                <span>Attach Sample File</span>
              </button>
              <div className="flex flex-wrap gap-1.5">
                {attachments.map((file, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                    {file}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isBelowFloor}
              className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Official Bid
            </button>
          </div>

        </form>
      )}
    </Modal>
  );
}
