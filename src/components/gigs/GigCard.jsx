import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import StatusBadge from '../common/StatusBadge';
import RatingStars from '../common/RatingStars';
import UserAvatar from '../common/UserAvatar';
import { formatCurrency, timeAgo } from '../../lib/utils';
import {
  MapPin,
  Globe,
  Clock,
  Bookmark,
  DollarSign,
  Users,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function GigCard({ gig }) {
  const { isGigSaved, toggleSaveGig } = useMarketplace();
  const isSaved = isGigSaved(gig.id);

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-brand-300 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between group overflow-hidden">
      
      {/* Top Header info */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {gig.subcategory || gig.category}
            </span>
            <StatusBadge status={gig.status} size="sm" />
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveGig(gig.id);
            }}
            className={`p-1.5 rounded-lg border transition-colors ${
              isSaved
                ? "bg-brand-50 border-brand-300 text-brand-600"
                : "border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            }`}
            title={isSaved ? "Saved to Bookmarks" : "Save this gig"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-brand-600" : ""}`} />
          </button>
        </div>

        {/* Title */}
        <Link to={`/gigs/${gig.id}`}>
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
            {gig.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
          {gig.description}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {gig.requiredSkills?.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-blue-50/70 text-brand-800 px-2 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
          {gig.requiredSkills?.length > 3 && (
            <span className="text-[11px] text-slate-400 font-medium px-1 py-0.5">
              +{gig.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Middle Specs Bar */}
      <div className="px-5 py-2.5 bg-slate-50/60 border-y border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          {gig.type === 'remote' ? (
            <span className="flex items-center gap-1 text-brand-700 font-medium">
              <Globe className="w-3.5 h-3.5 text-brand-500" /> Remote / Digital
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-600 truncate max-w-[150px]" title={gig.location}>
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> {gig.location}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>Due {gig.deadline}</span>
        </div>
      </div>

      {/* Bottom Footer: Budget & Poster Info */}
      <div className="p-5 pt-3 flex items-center justify-between">
        {/* Poster snippet */}
        <Link 
          to={`/profile/${gig.ownerId || gig.owner?.id}`}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <UserAvatar user={gig.owner} size="sm" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-800 truncate max-w-[90px]">
              {gig.owner?.name || "Client"}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <RatingStars rating={gig.owner?.rating} size="sm" showNumber={true} />
            </div>
          </div>
        </Link>

        {/* Budget & Min Bid */}
        <div className="text-right">
          <div className="text-base font-extrabold text-slate-900 leading-tight">
            {formatCurrency(gig.budget)}
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            Min Floor: <span className="text-brand-700 font-semibold">{formatCurrency(gig.minimumBidFloor || gig.budget * 0.8)}</span>
          </div>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="px-5 pb-3 pt-0">
        <Link
          to={`/gigs/${gig.id}`}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-xs font-semibold text-slate-700 transition-colors"
        >
          <span>View Details & Bids ({gig.bidsCount || 0})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
