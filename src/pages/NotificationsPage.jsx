import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { timeAgo } from '../lib/utils';
import {
  Bell,
  CheckCircle2,
  BadgeDollarSign,
  ShieldCheck,
  MessageSquare,
  Trophy,
  DollarSign,
  AlertTriangle,
  Star,
  CheckCheck
} from 'lucide-react';

const NOTIF_ICONS = {
  BadgeDollarSign: BadgeDollarSign,
  CheckCircle2: CheckCircle2,
  ShieldCheck: ShieldCheck,
  MessageSquare: MessageSquare,
  Trophy: Trophy,
  DollarSign: DollarSign,
  AlertTriangle: AlertTriangle,
  Star: Star
};

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useMarketplace();

  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'UNREAD') return !n.read;
    if (activeFilter === 'BIDS') return n.type.includes('BID');
    if (activeFilter === 'ESCROW') return n.type.includes('ESCROW') || n.type.includes('PAYMENT');
    return true;
  });

  return (
    <div className="w-full bg-slate-50/50 py-8 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>TaskProxi Platform</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">Alerts</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Bell className="w-6 h-6 text-brand-600" /> Notification Center
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Updates on bids, escrow states, and work verification milestones.
            </p>
          </div>

          <button
            onClick={markAllNotificationsAsRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All as Read</span>
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          {['ALL', 'UNREAD', 'BIDS', 'ESCROW'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === f
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle divide-y divide-slate-100 overflow-hidden">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(item => {
              const IconComponent = NOTIF_ICONS[item.icon] || Bell;
              return (
                <div
                  key={item.id}
                  onClick={() => markNotificationAsRead(item.id)}
                  className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                    !item.read ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                    !item.read ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-xs sm:text-sm ${!item.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'}`}>
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {timeAgo(item.timestamp)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>

                    {item.link && (
                      <Link
                        to={item.link}
                        className="inline-block text-xs font-bold text-brand-600 hover:text-brand-800 mt-2"
                      >
                        View Details &rarr;
                      </Link>
                    )}
                  </div>

                  {!item.read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-600 flex-shrink-0 mt-1.5" />
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              No notifications found for this filter.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
