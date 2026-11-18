import React from 'react';
import { Dumbbell } from 'lucide-react';

interface HeaderProps {
  activeWorkoutCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeWorkoutCount }) => {
  return (
    <header className="border-b border-[#222636] bg-[#090a0f]/95 backdrop-blur-md sticky top-0 z-30 px-4 py-3">
      <div className="max-w-xl mx-auto flex items-center justify-between">
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

        {activeWorkoutCount > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Faol
          </div>
        )}
      </div>
    </header>
  );
};
