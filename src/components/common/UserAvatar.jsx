import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function UserAvatar({ user, size = "md", showVerified = true }) {
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl"
  };

  const badgeSize = {
    sm: "w-3 h-3 -right-0.5 -bottom-0.5",
    md: "w-4 h-4 -right-1 -bottom-1",
    lg: "w-5 h-5 -right-1 -bottom-1",
    xl: "w-5 h-5 right-0 bottom-0"
  };

  const name = user?.name || "User";
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="relative inline-block select-none flex-shrink-0">
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover border border-slate-200 shadow-sm`}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-brand-100 text-brand-800 font-semibold flex items-center justify-center border border-brand-200 shadow-sm`}>
          {initials}
        </div>
      )}

      {showVerified && user?.verified && (
        <span
          title="Verified TaskProxi Member"
          className={`absolute ${badgeSize[size]} bg-white rounded-full flex items-center justify-center`}
        >
          <CheckCircle2 className="w-full h-full text-brand-600 fill-brand-100" />
        </span>
      )}
    </div>
  );
}
