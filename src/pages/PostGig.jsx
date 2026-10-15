import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatCurrency, calculateBidFloor } from '../lib/utils';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Plus,
  X,
  Globe,
  MapPin,
  Layers,
  Sparkles
} from 'lucide-react';

export default function PostGig() {
  const navigate = useNavigate();
  const { createGig, categories, currentUser } = useMarketplace();

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('cat_home_services');
  const [subcategoryId, setSubcategoryId] = useState('sub_assembly');
  const [serviceId, setServiceId] = useState('srv_ikea_assembly');
  const [workType, setWorkType] = useState('physical');
  const [location, setLocation] = useState('Indiranagar, Bengaluru, Karnataka');
  const [travelRadius, setTravelRadius] = useState('5 km');
  const [budget, setBudget] = useState('3500');
  const [currency, setCurrency] = useState('INR');
  const [deadline, setDeadline] = useState('2026-10-01');
  const [requiredWorkers, setRequiredWorkers] = useState(1);
  const [skillInput, setSkillInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState(['Furniture Assembly', 'Tools Required']);
  const [error, setError] = useState('');

  const selectedCategoryObj = categories.find(c => c.id === categoryId) || categories[0];
  const selectedSubcategoryObj = selectedCategoryObj.subcategories.find(s => s.id === subcategoryId) || selectedCategoryObj.subcategories[0];

  const minBidFloor = calculateBidFloor(Number(budget) || 0);

  const handleAddSkill = () => {
    if (skillInput.trim() && !requiredSkills.includes(skillInput.trim())) {
      setRequiredSkills([...requiredSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skillToRemove));
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!title.trim() || title.length < 10) {
        setError('Please provide a descriptive title of at least 10 characters.');
        return;
      }
      if (!description.trim() || description.length < 30) {
        setError('Please provide detailed instructions of at least 30 characters.');
        return;
      }
    }
    if (step === 2) {
      if (workType !== 'remote' && !location.trim()) {
        setError('Physical and hybrid gigs require a location.');
        return;
      }
    }
    if (step === 3) {
      if (!budget || Number(budget) < 500) {
        setError('Minimum budget on TaskProxi is ₹500.');
        return;
      }
      if (!deadline) {
        setError('Please select a deadline.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePublish = () => {
    try {
      const newGig = createGig({
        title: title.trim(),
        description: description.trim(),
        categoryId,
        category: selectedCategoryObj.name,
        subcategoryId,
        subcategory: selectedSubcategoryObj.name,
        serviceId,
        service: selectedSubcategoryObj.services.find(srv => srv.id === serviceId)?.name || selectedSubcategoryObj.name,
        type: workType,
        location: workType === 'remote' ? 'Remote' : location.trim(),
        travelRadius: workType === 'remote' ? null : travelRadius,
        budget: Number(budget),
        currency,
        deadline,
        requiredWorkers: Number(requiredWorkers) || 1,
        requiredSkills
      });

      navigate(`/gigs/${newGig.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full bg-slate-50/50 py-10 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-brand-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>TaskProxi Gig Publishing Wizard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Post a New Gig
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Specify your requirements, category hierarchy, and budget. Our fair-wage engine will automatically calculate the 80% bid floor.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8 shadow-subtle">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className={`p-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 ${step >= 1 ? 'bg-brand-50 text-brand-800 border border-brand-200' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span className="hidden sm:inline">Details</span>
            </div>
            <div className={`p-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 ${step >= 2 ? 'bg-brand-50 text-brand-800 border border-brand-200' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span className="hidden sm:inline">Taxonomy & Mode</span>
            </div>
            <div className={`p-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 ${step >= 3 ? 'bg-brand-50 text-brand-800 border border-brand-200' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span className="hidden sm:inline">Budget & Floor</span>
            </div>
            <div className={`p-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 ${step >= 4 ? 'bg-brand-50 text-brand-800 border border-brand-200' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px]">4</span>
              <span className="hidden sm:inline">Review & Post</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 1: Gig Title & Description</h3>
                <p className="text-xs text-slate-500 mt-0.5">Describe what needs to be done clearly so specialists can quote accurately.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Gig Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Repair leaking shutoff valve under kitchen sink"
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Detailed Scope of Work *
                </label>
                <textarea
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Include background details, required tools or materials, access information..."
                  className="w-full p-4 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Required Competencies & Skills
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); }}}
                    placeholder="Add a skill tag..."
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {requiredSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs bg-blue-50 text-brand-800 px-2.5 py-1 rounded-md border border-blue-200 font-medium"
                    >
                      {skill}
                      <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-rose-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 2: Category & Location Scope</h3>
                <p className="text-xs text-slate-500 mt-0.5">Categorize your gig for targeted contractor discovery.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    1. Primary Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => {
                      const newCatId = e.target.value;
                      setCategoryId(newCatId);
                      const cat = categories.find(c => c.id === newCatId);
                      if (cat && cat.subcategories.length > 0) {
                        setSubcategoryId(cat.subcategories[0].id);
                        setServiceId(cat.subcategories[0].services[0]?.id || '');
                      }
                    }}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    2. Subcategory
                  </label>
                  <select
                    value={subcategoryId}
                    onChange={(e) => {
                      const newSubId = e.target.value;
                      setSubcategoryId(newSubId);
                      const sub = selectedCategoryObj.subcategories.find(s => s.id === newSubId);
                      if (sub && sub.services.length > 0) {
                        setServiceId(sub.services[0].id);
                      }
                    }}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                  >
                    {selectedCategoryObj.subcategories.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    3. Specific Service
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                  >
                    {selectedSubcategoryObj.services.map(srv => (
                      <option key={srv.id} value={srv.id}>{srv.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Work Mode *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div
                    onClick={() => setWorkType('physical')}
                    className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                      workType === 'physical'
                        ? 'bg-blue-50/80 border-brand-500 text-brand-900 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <MapPin className="w-5 h-5 mx-auto mb-1.5 text-brand-600" />
                    <p className="font-bold text-xs">On-Site / Physical</p>
                  </div>
                  <div
                    onClick={() => setWorkType('remote')}
                    className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                      workType === 'remote'
                        ? 'bg-blue-50/80 border-brand-500 text-brand-900 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Globe className="w-5 h-5 mx-auto mb-1.5 text-brand-600" />
                    <p className="font-bold text-xs">Fully Remote</p>
                  </div>
                  <div
                    onClick={() => setWorkType('hybrid')}
                    className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                      workType === 'hybrid'
                        ? 'bg-blue-50/80 border-brand-500 text-brand-900 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Layers className="w-5 h-5 mx-auto mb-1.5 text-brand-600" />
                    <p className="font-bold text-xs">Hybrid</p>
                  </div>
                </div>
              </div>

              {workType !== 'remote' ? (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Neighborhood / City / Zip *
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Indiranagar, Bengaluru, Karnataka"
                        className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Travel Radius
                      </label>
                      <select
                        value={travelRadius}
                        onChange={(e) => setTravelRadius(e.target.value)}
                        className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                      >
                        <option value="5 km">Within 5 km</option>
                        <option value="10 km">Within 10 km</option>
                        <option value="25 km">Within 25 km</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Remote gig: Location field is omitted from public discovery as work is performed digitally.</span>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 3: Budget & Timeline</h3>
                <p className="text-xs text-slate-500 mt-0.5">TaskProxi guarantees fair wages with an automated minimum bid floor.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Budget (₹ INR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      min="500"
                      step="100"
                      className="w-full pl-8 pr-4 py-2.5 text-sm font-bold rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Completion Deadline *
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-xl border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-brand-600" />
                    <span className="font-bold text-xs text-brand-900">Enforced 80% Bid Floor</span>
                  </div>
                  <span className="text-sm font-black text-brand-700">
                    {formatCurrency(minBidFloor)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Based on your {formatCurrency(Number(budget) || 0)} budget, contractors cannot submit proposals below <strong className="text-slate-900">{formatCurrency(minBidFloor)}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Workers Needed
                </label>
                <select
                  value={requiredWorkers}
                  onChange={(e) => setRequiredWorkers(Number(e.target.value))}
                  className="w-full sm:w-48 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                >
                  <option value="1">1 Worker</option>
                  <option value="2">2 Workers</option>
                  <option value="3">3 Workers</option>
                </select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 4: Review Your Gig</h3>
                <p className="text-xs text-slate-500 mt-0.5">Confirm details before opening your gig for competitive bidding.</p>
              </div>

              <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-brand-800">
                      {selectedSubcategoryObj.name}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-lg mt-1">{title}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900">{formatCurrency(Number(budget) || 0)}</span>
                    <p className="text-[10px] text-slate-500">Floor: {formatCurrency(minBidFloor)}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {description}
                </p>

                <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <span>Mode: <strong className="text-slate-700 capitalize">{workType}</strong></span>
                  <span>Location: <strong className="text-slate-700">{workType === 'remote' ? 'Remote' : location}</strong></span>
                  <span>Deadline: <strong className="text-slate-700">{deadline}</strong></span>
                  <span>Poster: <strong className="text-slate-700">{currentUser.name}</strong></span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => { setError(''); setStep(prev => prev - 1); }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <Link to="/gigs" className="text-xs text-slate-400 hover:text-slate-600">
                Cancel
              </Link>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="px-6 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-card flex items-center gap-1.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Gig to Marketplace</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
