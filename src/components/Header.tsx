import React from 'react';
import { Dumbbell } from 'lucide-react';

interface HeaderProps {
  activeWorkoutCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeWorkoutCount }) => {
  return (
    <header className="border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3 sm:py-4">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black shadow-md shadow-emerald-500/20 font-black">
            <Dumbbell size={20} className="transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white m-0 p-0 leading-none">
                GymNotes
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
              Sport & Zal mashqlari kundaligi
            </p>
          </div>
        </div>

        {activeWorkoutCount > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Mashg'ulot faol</span>
          </div>
        )}
      </div>
    </header>
  );
};
