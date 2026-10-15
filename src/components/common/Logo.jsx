import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({
  size = 'md',
  showText = true,
  dark = false,
  to = '/',
  className = '',
  clickable = true
}) {
  const sizeMap = {
    sm: { img: 'w-7 h-7', title: 'text-lg', subtitle: 'text-[8px]' },
    md: { img: 'w-10 h-10', title: 'text-2xl', subtitle: 'text-[9px]' },
    lg: { img: 'w-14 h-14', title: 'text-3xl', subtitle: 'text-[10px]' },
    xl: { img: 'w-20 h-20', title: 'text-4xl', subtitle: 'text-xs' }
  };

  const { img, title, subtitle } = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo-icon.png"
        alt="TaskProxi Logo"
        className={`${img} object-contain flex-shrink-0 drop-shadow-sm transition-transform duration-200 group-hover:scale-105`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight leading-none ${title} ${dark ? 'text-white' : 'text-slate-900'}`}>
            Task<span className={dark ? 'text-brand-300' : 'text-brand-600'}>Proxi</span>
          </span>
          <span className={`font-bold tracking-[0.2em] uppercase mt-1 ${subtitle} ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Universal Marketplace
          </span>
        </div>
      )}
    </div>
  );

  if (!clickable || !to) {
    return content;
  }

  return (
    <Link to={to} className="flex-shrink-0 group inline-flex items-center">
      {content}
    </Link>
  );
}
