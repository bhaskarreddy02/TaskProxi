import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import UserAvatar from '../components/common/UserAvatar';
import RatingStars from '../components/common/RatingStars';
import { formatCurrency, formatDate } from '../lib/utils';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Star,
  Award,
  MessageSquare
} from 'lucide-react';

export default function UserProfile() {
  const { id } = useParams();
  const { allUsers, currentUser } = useMarketplace();

  const user = allUsers.find(u => u.id === id) || (id ? allUsers[0] : currentUser);
  const isMe = user.id === currentUser.id;

  return (
    <div className="w-full bg-slate-50/50 py-10 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <UserAvatar user={user} size="xl" showVerified={true} />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Identity Verified
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-700 font-semibold border border-blue-200">
                    Dual-Role Member
                  </span>
                </div>

                <p className="text-sm text-slate-600 font-medium mt-1">
                  {user.headline}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {user.location}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Member since {user.memberSince}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Responds within {user.responseTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              {!isMe ? (
                <Link
                  to="/messages"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Message Specialist
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  Edit Profile in Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 font-medium">Overall Rating</p>
              <div className="mt-1 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span className="text-lg font-black text-slate-900">{user.overallRating?.toFixed(2)}</span>
                <span className="text-xs text-slate-400">({user.reviewCount})</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 font-medium">Completed Gigs</p>
              <p className="text-lg font-black text-slate-900 mt-1">
                {user.completedWorkerGigsCount} <span className="text-xs text-slate-400 font-normal">as worker</span>
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 font-medium">Completion Rate</p>
              <p className="text-lg font-black text-emerald-600 mt-1">{user.completionRate}%</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 font-medium">Gigs Posted</p>
              <p className="text-lg font-black text-brand-700 mt-1">
                {user.postedGigsCount} <span className="text-xs text-slate-400 font-normal">as client</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">About</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {user.bio}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skills & Services</h3>
              <div className="flex flex-wrap gap-1.5">
                {user.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded bg-blue-50 text-brand-800 border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Category Ratings
                </h3>
                <span className="text-[10px] text-brand-700 font-semibold bg-brand-50 px-2 py-0.5 rounded">
                  SRS FR6
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Reputation is calculated independently per category so physical work ratings do not distort digital skills.
              </p>

              <div className="space-y-3">
                {user.categoryRatings?.map((cr, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-800">{cr.categoryName}</span>
                      <span className="font-extrabold text-xs text-slate-900">{cr.rating.toFixed(1)} / 5.0</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-600 h-full rounded-full"
                        style={{ width: `${(cr.rating / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Based on {cr.count} completed gigs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-600" />
                  Verified Platform Work History
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Derived strictly from completed platform gigs (SRS Section 3.1 FR7).
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                100% Verified
              </span>
            </div>

            {user.verifiedWorkHistory && user.verifiedWorkHistory.length > 0 ? (
              <div className="space-y-6">
                {user.verifiedWorkHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-brand-200 transition-all shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <span className="text-xs font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                      <span>Role: <strong className="text-slate-700">{item.role}</strong></span>
                      <span>&bull;</span>
                      <span>Client: <strong className="text-slate-700">{item.clientName}</strong></span>
                      <span>&bull;</span>
                      <span>Completed: {formatDate(item.completedDate)}</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-start gap-2">
                      <RatingStars rating={item.rating} size="sm" showNumber={false} />
                      <p className="text-xs text-slate-700 italic">
                        "{item.reviewText}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No completed history recorded yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
