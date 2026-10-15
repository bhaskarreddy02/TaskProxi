import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import GigCard from '../components/gigs/GigCard';
import FilterPanel from '../components/gigs/FilterPanel';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  PlusCircle
} from 'lucide-react';

export default function BrowseGigs() {
  const { gigs } = useMarketplace();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [maxBudget, setMaxBudget] = useState(3000);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredGigs = useMemo(() => {
    return gigs.filter(gig => {
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesTitle = gig.title?.toLowerCase().includes(q);
        const matchesDesc = gig.description?.toLowerCase().includes(q);
        const matchesCategory = gig.category?.toLowerCase().includes(q) || gig.subcategory?.toLowerCase().includes(q);
        const matchesSkill = gig.requiredSkills?.some(s => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesSkill) {
          return false;
        }
      }
      if (selectedCategory !== 'all') {
        if (gig.categoryId !== selectedCategory) return false;
      }
      if (selectedSubcategory !== 'all') {
        if (gig.subcategoryId !== selectedSubcategory) return false;
      }
      if (selectedType !== 'all') {
        if (selectedType === 'remote' && gig.type !== 'remote') return false;
        if (selectedType === 'physical' && gig.type !== 'physical' && gig.type !== 'hybrid') return false;
      }
      if (gig.budget > maxBudget) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'budget_desc') return b.budget - a.budget;
      if (sortBy === 'budget_asc') return a.budget - b.budget;
      if (sortBy === 'bids') return (b.bidsCount || 0) - (a.bidsCount || 0);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [gigs, query, selectedCategory, selectedSubcategory, selectedType, maxBudget, sortBy]);

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedType('all');
    setMaxBudget(3000);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="w-full bg-slate-50/50 py-8 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link to="/" className="hover:text-brand-600">Home</Link>
              <span>/</span>
              <span className="text-slate-800 font-medium">Marketplace Discovery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Active Gigs
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Showing {filteredGigs.length} available opportunities with guaranteed 80% minimum wage floor.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>Filters</span>
            </button>

            <Link
              to="/post-gig"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Gig</span>
            </Link>
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 mb-6 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords, skills, or service title..."
              className="w-full pl-9 pr-8 py-2 text-xs text-slate-900 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:border-brand-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1 whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:border-brand-500"
            >
              <option value="newest">Newest First</option>
              <option value="budget_desc">Budget: High to Low</option>
              <option value="budget_asc">Budget: Low to High</option>
              <option value="bids">Most Bids</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              onReset={handleResetFilters}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredGigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredGigs.map(gig => (
                  <GigCard key={gig.id} gig={gig} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-subtle">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No gigs found matching your criteria</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your keywords, expanding the maximum budget, or resetting filters to see all available marketplace opportunities.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-5 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                maxBudget={maxBudget}
                setMaxBudget={setMaxBudget}
                onReset={handleResetFilters}
              />
            </div>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 bg-brand-600 text-white font-bold text-xs rounded-lg mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
