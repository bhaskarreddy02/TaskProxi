import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Filter, RotateCcw, DollarSign, Globe, MapPin } from 'lucide-react';

export default function FilterPanel({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedType,
  setSelectedType,
  maxBudget,
  setMaxBudget,
  onReset
}) {
  const { categories } = useMarketplace();

  const currentCategoryObj = categories.find(c => c.id === selectedCategory);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" /> Filter Gigs
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory('all');
          }}
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter (dynamic based on selected category) */}
      {currentCategoryObj && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Subcategory
          </label>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Subcategories</option>
            {currentCategoryObj.subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Work Type Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Work Mode
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setSelectedType('all')}
            className={`py-1.5 rounded-md transition-all ${
              selectedType === 'all'
                ? "bg-white text-brand-700 font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedType('remote')}
            className={`py-1.5 rounded-md transition-all flex items-center justify-center gap-1 ${
              selectedType === 'remote'
                ? "bg-white text-brand-700 font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Globe className="w-3 h-3" /> Remote
          </button>
          <button
            onClick={() => setSelectedType('physical')}
            className={`py-1.5 rounded-md transition-all flex items-center justify-center gap-1 ${
              selectedType === 'physical'
                ? "bg-white text-brand-700 font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MapPin className="w-3 h-3" /> On-site
          </button>
        </div>
      </div>

      {/* Budget Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Max Budget
          </label>
          <span className="text-xs font-bold text-brand-700">
            ₹{Number(maxBudget).toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="100000"
          step="1000"
          value={maxBudget}
          onChange={(e) => setMaxBudget(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹1,000</span>
          <span>₹50,000</span>
          <span>₹1,00,000+</span>
        </div>
      </div>

      {/* SRS Rule Reminder */}
      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg">
        <p className="text-[11px] text-brand-900 font-medium leading-relaxed">
          <span className="font-bold">SRS Section 3.5:</span> All submitted bids must satisfy the server-enforced minimum floor (80% of budget) to guarantee fair marketplace wages.
        </p>
      </div>
    </div>
  );
}
