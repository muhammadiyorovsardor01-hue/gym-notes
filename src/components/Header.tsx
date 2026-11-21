import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import type { SyncStatus } from '../types';
import { Dumbbell, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  activeWorkoutCount: number;
  user: User | null;
  syncStatus: SyncStatus;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeWorkoutCount,
  user,
  syncStatus,
  onOpenAccount,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [user?.photoURL]);

  const userInitial = (user?.displayName || user?.email || 'G')[0]?.toUpperCase() || 'G';

  const statusDotClass =
    syncStatus === 'syncing'
      ? 'bg-amber-400 animate-pulse'
      : syncStatus === 'error'
        ? 'bg-red-500'
        : syncStatus === 'synced' || user
          ? 'bg-emerald-400'
          : 'bg-emerald-500/70';

  return (
    <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-main)]/95 backdrop-blur-md sticky top-0 z-30 px-4 py-3">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black">
            <Dumbbell size={18} className="transform -rotate-45" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-white m-0 p-0 leading-none">
              GymNotes
            </h1>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              Mashg'ulotlar kundaligi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {activeWorkoutCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Faol
            </div>
          )}

          {/* Circular Profile / Google Account & Personalization Button */}
          <button
            type="button"
            onClick={onOpenAccount}
            className="w-9 h-9 rounded-full relative bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-emerald-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all overflow-visible"
            title={user ? `${user.displayName || user.email} — Profil va Sozlamalar` : 'Google bilan kirish va Mavzular'}
          >
            {user ? (
              user.photoURL && !imgFailed ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Profil'}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="w-full h-full rounded-full bg-emerald-500 text-black font-bold text-xs flex items-center justify-center">
                  {userInitial}
                </span>
              )
            ) : (
              <UserIcon size={17} />
            )}
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-main)] ${statusDotClass}`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
