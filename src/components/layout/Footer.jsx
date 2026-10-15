import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Scale, Lock, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Top trust highlights */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-brand-900/80 text-brand-300 border border-brand-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Simulated Escrow</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Funds are secured prior to work commencing and released only upon client approval.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-brand-900/80 text-brand-300 border border-brand-800">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">80% Bid Floor Policy</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Protects workers against race-to-the-bottom underbidding while preserving client selection choice.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-brand-900/80 text-brand-300 border border-brand-800">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Category Reputation</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Independent ratings for every skill type: plumbing ratings stay distinct from coding ratings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-brand-900/80 text-brand-300 border border-brand-800">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Universal Account</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                One login to both hire and get hired. Seamlessly switch between client and contractor roles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Columns */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-black text-lg">
                T
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Task<span className="text-brand-400">Proxi</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
              Get things done. Find people who can. The category-agnostic global marketplace for physical, digital, and professional gigs.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Globe className="w-3.5 h-3.5" />
              <span>Worldwide &bull; Multi-Currency &bull; Multi-Category</span>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h5 className="font-semibold text-white text-sm mb-3">Popular Services</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/gigs?category=cat_home_services" className="hover:text-brand-300 transition-colors">Plumbing & Repairs</Link></li>
              <li><Link to="/gigs?category=cat_home_services" className="hover:text-brand-300 transition-colors">Furniture Assembly</Link></li>
              <li><Link to="/gigs?category=cat_digital_tech" className="hover:text-brand-300 transition-colors">React & Web Development</Link></li>
              <li><Link to="/gigs?category=cat_digital_tech" className="hover:text-brand-300 transition-colors">UI/UX Design Mockups</Link></li>
              <li><Link to="/gigs?category=cat_events_staffing" className="hover:text-brand-300 transition-colors">Event Staff & Bartenders</Link></li>
              <li><Link to="/gigs?category=cat_professional" className="hover:text-brand-300 transition-colors">Bookkeeping & Tax Prep</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="font-semibold text-white text-sm mb-3">Platform</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/gigs" className="hover:text-brand-300 transition-colors">Explore Marketplace</Link></li>
              <li><Link to="/post-gig" className="hover:text-brand-300 transition-colors">Post a Gig</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-300 transition-colors">User Dashboard</Link></li>
              <li><Link to="/availability" className="hover:text-brand-300 transition-colors">Availability Calendar</Link></li>
              <li><Link to="/messages" className="hover:text-brand-300 transition-colors">Gig-Linked Chat</Link></li>
              <li><Link to="/admin" className="hover:text-brand-300 transition-colors flex items-center gap-1">Admin Panel <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="font-semibold text-white text-sm mb-3">Company & Safety</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#how-it-works" className="hover:text-brand-300 transition-colors">How It Works</a></li>
              <li><span className="text-slate-500 cursor-not-allowed">Fair Wage Policy</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Simulated Escrow Docs</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Terms & Conditions</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Trust & Security</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Contact Support</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} TaskProxi Inc. All rights reserved. Academic V1 Implementation.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Standards</span>
            <span className="hover:text-slate-400 cursor-pointer">SRS Specification IEEE 830</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
