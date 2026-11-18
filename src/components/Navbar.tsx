import React from 'react';
import { Dumbbell, Video, History } from 'lucide-react';

export type TabType = 'workout' | 'exercises' | 'history';

interface NavbarProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
  isWorkoutActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onChangeTab,
  isWorkoutActive,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#090a0f]/98 border-t border-[#1a1d2a] backdrop-blur-lg px-4 py-1.5 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-0.5">
        <button
          onClick={() => onChangeTab('workout')}
          className={`relative flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
            currentTab === 'workout'
              ? 'text-emerald-400'
              : 'text-slate-500 active:text-slate-300'
          }`}
        >
          {isWorkoutActive && (
            <span className="absolute top-1 right-7 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          )}
          <Dumbbell size={20} strokeWidth={currentTab === 'workout' ? 2.5 : 1.5} />
          <span className="text-[10px] mt-1 font-medium">Mashg'ulot</span>
        </button>

        <button
          onClick={() => onChangeTab('exercises')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
            currentTab === 'exercises'
              ? 'text-emerald-400'
              : 'text-slate-500 active:text-slate-300'
          }`}
        >
          <Video size={20} strokeWidth={currentTab === 'exercises' ? 2.5 : 1.5} />
          <span className="text-[10px] mt-1 font-medium">Texnika</span>
        </button>

        <button
          onClick={() => onChangeTab('history')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${
            currentTab === 'history'
              ? 'text-emerald-400'
              : 'text-slate-500 active:text-slate-300'
          }`}
        >
          <History size={20} strokeWidth={currentTab === 'history' ? 2.5 : 1.5} />
          <span className="text-[10px] mt-1 font-medium">Tarix</span>
        </button>
      </div>
    </nav>
  );
};
