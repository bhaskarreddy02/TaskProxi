import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export default function AvailabilityPage() {
  const { currentUser } = useMarketplace();

  const [globalStatus, setGlobalStatus] = useState('AVAILABLE');
  const [savedBanner, setSavedBanner] = useState('');

  const [weeklySchedule, setWeeklySchedule] = useState([
    { day: "Monday", active: true, start: "08:00", end: "17:00" },
    { day: "Tuesday", active: true, start: "08:00", end: "17:00" },
    { day: "Wednesday", active: true, start: "08:00", end: "17:00" },
    { day: "Thursday", active: true, start: "08:00", end: "17:00" },
    { day: "Friday", active: true, start: "08:00", end: "16:00" },
    { day: "Saturday", active: false, start: "09:00", end: "14:00" },
    { day: "Sunday", active: false, start: "10:00", end: "14:00" }
  ]);

  const [specificDates, setSpecificDates] = useState([
    { id: 1, date: "2026-09-24", label: "Scheduled: Pax Wardrobe Assembly (Ballard)", type: "BOOKED" },
    { id: 2, date: "2026-10-04", label: "Personal Out of Town (Unavailable)", type: "BLOCKED" }
  ]);

  const [newDateInput, setNewDateInput] = useState('');
  const [newLabelInput, setNewLabelInput] = useState('');

  const toggleDayActive = (index) => {
    setWeeklySchedule(prev => prev.map((d, idx) => idx === index ? { ...d, active: !d.active } : d));
  };

  const handleTimeChange = (index, field, value) => {
    setWeeklySchedule(prev => prev.map((d, idx) => idx === index ? { ...d, [field]: value } : d));
  };

  const handleAddDate = (e) => {
    e.preventDefault();
    if (newDateInput && newLabelInput.trim()) {
      setSpecificDates(prev => [
        ...prev,
        { id: Date.now(), date: newDateInput, label: newLabelInput.trim(), type: 'BLOCKED' }
      ]);
      setNewDateInput('');
      setNewLabelInput('');
    }
  };

  const handleRemoveDate = (id) => {
    setSpecificDates(prev => prev.filter(d => d.id !== id));
  };

  const handleSave = () => {
    setSavedBanner('Availability schedule saved! System will prevent double-booking on your active dates.');
    setTimeout(() => setSavedBanner(''), 4000);
  };

  return (
    <div className="w-full bg-slate-50/50 py-8 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>TaskProxi Platform</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">Scheduling</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-brand-600" /> Availability & Conflict Prevention
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Define recurring working windows and blackout dates to prevent overlapping gig assignments (SRS FR22-FR25).
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
          >
            Save Schedule Changes
          </button>
        </div>

        {savedBanner && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{savedBanner}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Current Marketplace Status</h3>
              <p className="text-xs text-slate-500">Controls whether you appear in recommendation algorithms for new gigs.</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'AVAILABLE', label: 'Available', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
                { id: 'BUSY', label: 'Busy (Limited)', color: 'bg-amber-50 text-amber-700 border-amber-300' },
                { id: 'NOT_AVAILABLE', label: 'Unavailable', color: 'bg-slate-100 text-slate-700 border-slate-300' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setGlobalStatus(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    globalStatus === st.id ? `${st.color} shadow-xs ring-2 ring-brand-500/20` : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-600" /> Weekly Recurring Windows
              </h3>
              <span className="text-[10px] text-slate-400">SRS FR22</span>
            </div>

            <div className="divide-y divide-slate-100">
              {weeklySchedule.map((item, idx) => (
                <div key={item.day} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`day-${idx}`}
                      checked={item.active}
                      onChange={() => toggleDayActive(idx)}
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <label htmlFor={`day-${idx}`} className={`text-xs font-bold cursor-pointer ${item.active ? 'text-slate-900' : 'text-slate-400'}`}>
                      {item.day}
                    </label>
                  </div>

                  {item.active ? (
                    <div className="flex items-center gap-2 text-xs">
                      <input
                        type="time"
                        value={item.start}
                        onChange={(e) => handleTimeChange(idx, 'start', e.target.value)}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 font-medium"
                      />
                      <span className="text-slate-400">to</span>
                      <input
                        type="time"
                        value={item.end}
                        onChange={(e) => handleTimeChange(idx, 'end', e.target.value)}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 font-medium"
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Unavailable / Day Off</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Specific Dates & Blackouts</h3>
              
              <form onSubmit={handleAddDate} className="space-y-2 pb-3 border-b border-slate-100">
                <input
                  type="date"
                  value={newDateInput}
                  onChange={(e) => setNewDateInput(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newLabelInput}
                    onChange={(e) => setNewLabelInput(e.target.value)}
                    placeholder="Reason (e.g. Doctor appointment)..."
                    className="flex-1 text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                {specificDates.map(sd => (
                  <div key={sd.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-start justify-between gap-2 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{sd.date}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          sd.type === 'BOOKED' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {sd.type}
                        </span>
                      </div>
                      <p className="text-slate-500 mt-0.5">{sd.label}</p>
                    </div>

                    <button
                      onClick={() => handleRemoveDate(sd.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-brand-900 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>Automatic Double-Booking Check (FR25)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                When a gig poster accepts your bid, the system evaluates your availability against the gig's timeline. Physical overlapping assignments are rejected automatically.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
