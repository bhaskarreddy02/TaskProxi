import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import GigCard from '../components/gigs/GigCard';
import RatingStars from '../components/common/RatingStars';
import { useTypewriter } from '../hooks/useTypewriter';
import {
  Search,
  Wrench,
  Code,
  Sparkles,
  Briefcase,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  UserCheck,
  CreditCard,
  Scale
} from 'lucide-react';

const SEARCH_SUGGESTIONS = [
  "assemble Ikea table",
  "fix leaky faucet",
  "React developer",
  "mount TV on wall",
  "move 1BHK apartment",
  "house deep cleaning",
  "hire event bartender",
  "emergency electrician",
  "logo & UI designer"
];

export default function Home() {
  const { gigs, categories } = useMarketplace();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const { displayText, cursorVisible, currentWord } = useTypewriter({
    words: SEARCH_SUGGESTIONS,
    typeSpeed: 60,
    deleteSpeed: 30,
    delayAfterWord: 1800,
    delayAfterDelete: 350,
    pause: Boolean(searchQuery)
  });

  const animatedPlaceholder = `What do you need done? (e.g. ${displayText}${!isFocused && cursorVisible ? '|' : ''})`;

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && !searchQuery && currentWord) {
      e.preventDefault();
      setSearchQuery(currentWord);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/gigs?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/gigs');
    }
  };

  const quickPills = [
    { name: "Furniture Assembly", categoryId: "cat_home_services" },
    { name: "TV Mounting", categoryId: "cat_home_services" },
    { name: "Plumbing Repairs", categoryId: "cat_home_services" },
    { name: "Web Development", categoryId: "cat_digital_tech" },
    { name: "House Cleaning", categoryId: "cat_home_services" },
    { name: "Event Bartenders", categoryId: "cat_events_staffing" },
    { name: "Apartment Moving", categoryId: "cat_moving_delivery" },
    { name: "Bookkeeping & Tax", categoryId: "cat_professional" }
  ];

  const popularProjects = [
    {
      title: "Furniture Assembly",
      price: "From ₹1,500",
      image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=80",
      query: "assembly"
    },
    {
      title: "Emergency Plumbing",
      price: "From ₹2,500",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&auto=format&fit=crop&q=80",
      query: "plumbing"
    },
    {
      title: "TV Mounting & Cables",
      price: "From ₹2,000",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=80",
      query: "mounting"
    },
    {
      title: "Fullstack Web & React",
      price: "From ₹8,000",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80",
      query: "react"
    },
    {
      title: "Home Deep Cleaning",
      price: "From ₹1,800",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80",
      query: "cleaning"
    },
    {
      title: "Apartment Moving Help",
      price: "From ₹2,800",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=500&auto=format&fit=crop&q=80",
      query: "moving"
    },
    {
      title: "Event Hospitality & Staff",
      price: "From ₹4,000",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop&q=80",
      query: "hospitality"
    },
    {
      title: "Bookkeeping & Accounting",
      price: "From ₹3,000",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80",
      query: "bookkeeping"
    }
  ];

  const featuredGigs = gigs.slice(0, 6);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-gradient-to-b from-brand-50/60 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-brand-800 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>The Universal Gig Marketplace &bull; Post Gigs &bull; Win Work</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Get things done. <br className="hidden sm:block" />
            <span className="text-brand-600">Find people who can.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            One single account to post gigs or bid on opportunities across physical repairs, digital software, hospitality shifts, and professional consulting.
          </p>

          <div className="mt-8 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl border-2 border-brand-600/30 hover:border-brand-600 focus-within:border-brand-600 shadow-float p-1.5 transition-all">
              <div className="pl-3.5 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-brand-600" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={animatedPlaceholder}
                className="w-full py-2.5 text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition-colors flex-shrink-0 shadow-sm"
              >
                Search Gigs
              </button>
            </form>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            <span className="text-xs font-semibold text-slate-500 mr-1">Popular:</span>
            {quickPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/gigs?q=${encodeURIComponent(pill.name)}`)}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-white hover:bg-brand-50 hover:text-brand-700 text-slate-700 border border-slate-200 shadow-xs transition-colors"
              >
                {pill.name}
              </button>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">12,400+</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Completed Platform Gigs</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-brand-700">80% Min Floor</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Fair-Wage Guaranteed</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">100% Escrow</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Payment Protection Hold</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-brand-700">4.9 / 5.0</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Category-Specific Ratings</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW TASKPROXI WORKS */}
      <section id="how-it-works" className="w-full py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-700">Transparent Marketplace Engine</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">How TaskProxi Works</h3>
            <p className="text-sm text-slate-600 mt-2">
              Whether you are posting a task or bidding on a project, our formal state machine guarantees fairness from first bid to final payout.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card">
              <h4 className="text-xl font-bold text-slate-900 mb-6">Simple 3-Step Lifecycle</h4>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-extrabold text-sm flex items-center justify-center flex-shrink-0 border border-brand-200">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Choose by price, skills & category reviews</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Compare bidders side-by-side with verified work histories. Our server-enforced 80% bid floor protects against predatory underbidding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-extrabold text-sm flex items-center justify-center flex-shrink-0 border border-brand-200">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Schedule availability without conflicts</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      First-class weekly availability slots prevent double-booking. Confirm exact delivery or on-site arrival dates upfront.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-extrabold text-sm flex items-center justify-center flex-shrink-0 border border-brand-200">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Chat, pay via simulated escrow, and review</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Funds are held securely in simulated escrow during execution. Payment is released only when the client signs off on completed work.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/post-gig"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Post Your First Gig <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/gigs"
                  className="text-xs font-semibold text-brand-700 hover:text-brand-900"
                >
                  Explore Gigs &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-card border border-slate-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&auto=format&fit=crop&q=80"
                alt="TaskProxi Verified Work"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/20 backdrop-blur-md text-xs font-semibold w-max mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dual-Sided Verified Feedback</span>
                </div>
                <h4 className="text-2xl font-extrabold text-white">
                  Reputation That Follows You Everywhere
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl leading-relaxed">
                  Unlike traditional apps, your work history is verified exclusively through completed platform gigs. Maintain high standing in plumbing while taking on freelance coding projects.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POPULAR PROJECTS GRID */}
      <section className="w-full py-16 bg-white border-b border-slate-200/80">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-700">Trending Services</h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Popular Marketplace Projects</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Browse standard pricing and verified experts ready to start today.</p>
            </div>
            <Link
              to="/gigs"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-800"
            >
              <span>See All Gigs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {popularProjects.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/gigs?q=${encodeURIComponent(proj.query)}`)}
                className="group cursor-pointer bg-white rounded-xl border border-slate-200 hover:border-brand-400 overflow-hidden shadow-subtle hover:shadow-card transition-all"
              >
                <div className="h-36 sm:h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3.5">
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors truncate">
                    {proj.title}
                  </h4>
                  <p className="text-xs font-semibold text-brand-700 mt-0.5">
                    {proj.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED LIVE GIGS */}
      <section className="w-full py-16 bg-slate-50/70 border-b border-slate-200/80">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-700">Active Opportunities</h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Featured Open Gigs</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Submit bids with fair pricing protection right now.</p>
            </div>
            <Link
              to="/gigs"
              className="text-xs sm:text-sm font-bold px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-brand-400 text-slate-800 hover:text-brand-700 shadow-xs transition-colors"
            >
              View All ({gigs.length}) Gigs
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGigs.map(gig => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="w-full py-16 bg-white border-b border-slate-200/80">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-700">Verified Testimonials</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              See What Verified Users Say
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Every review on TaskProxi is verified against a real completed gig transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <RatingStars rating={5} showNumber={false} size="md" />
              <p className="text-xs text-slate-700 mt-3 leading-relaxed italic">
                "Needed a licensed plumber for an under-sink CPVC pipe leak. Rajesh submitted a fair bid above the floor, arrived punctually at 9 AM, and completed the job cleanly. The escrow payout gave me total peace of mind."
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Pooja Reddy</h5>
                  <p className="text-[10px] text-slate-500">Homeowner &bull; Indiranagar, Bengaluru</p>
                </div>
                <span className="text-[10px] font-bold text-brand-700 px-2 py-0.5 rounded bg-brand-50 border border-brand-100">
                  Plumbing Repair
                </span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <RatingStars rating={5} showNumber={false} size="md" />
              <p className="text-xs text-slate-700 mt-3 leading-relaxed italic">
                "Ananya revamped our SaaS dashboard with React and Tailwind. The code was exceptionally organized and fast. Being able to compare bids while knowing the minimum bid floor protects quality made hiring effortless."
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Indic Tech Ltd.</h5>
                  <p className="text-[10px] text-slate-500">Tech Founder &bull; Bengaluru / Remote</p>
                </div>
                <span className="text-[10px] font-bold text-brand-700 px-2 py-0.5 rounded bg-brand-50 border border-brand-100">
                  React Web Dev
                </span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <RatingStars rating={5} showNumber={false} size="md" />
              <p className="text-xs text-slate-700 mt-3 leading-relaxed italic">
                "Rohan assembled our complex IKEA Pax closet and wall-mounted our 75-inch TV. Super friendly, arrived with heavy-duty tools, and tested everything for safety. Highly recommend."
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Priya Sharma</h5>
                  <p className="text-[10px] text-slate-500">Client &bull; Bandra, Mumbai</p>
                </div>
                <span className="text-[10px] font-bold text-brand-700 px-2 py-0.5 rounded bg-brand-50 border border-brand-100">
                  Furniture Assembly
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="w-full py-16 bg-brand-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to post your gig or start earning?
            </h3>
            <p className="text-sm text-brand-200 mt-1 max-w-xl">
              Join thousands of individuals and independent specialists using TaskProxi for honest, transparent, and fair-wage gig work.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/post-gig"
              className="px-6 py-3 rounded-xl bg-white text-brand-900 hover:bg-brand-50 font-extrabold text-sm shadow-card transition-colors"
            >
              Post a Gig Now
            </Link>
            <Link
              to="/gigs"
              className="px-6 py-3 rounded-xl bg-brand-800 text-white hover:bg-brand-700 font-bold text-sm border border-brand-700 transition-colors"
            >
              Find Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
