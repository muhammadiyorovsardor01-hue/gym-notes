import React from 'react';
import { Dumbbell, CalendarRange, Video, History } from 'lucide-react';

export type TabType = 'workout' | 'templates' | 'exercises' | 'history';

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
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#090a0f]/98 border-t border-[#1a1d2a] backdrop-blur-lg px-2 py-1.5 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {/* Workout */}
        <button
          onClick={() => onChangeTab('workout')}
          className={`relative flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
            currentTab === 'workout'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 active:text-slate-300'
          }`}
        >
          {isWorkoutActive && (
            <span className="absolute top-1 right-5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          )}
          <Dumbbell size={19} strokeWidth={currentTab === 'workout' ? 2.5 : 1.5} />
          <span className="text-[10px] mt-1 font-medium">Mashg'ulot</span>
        </button>

        {/* Templates / Days (Day 1, 2, 3) */}
        <button
          onClick={() => onChangeTab('templates')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
            currentTab === 'templates'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 active:text-slate-300'
          }`}
        >
          <CalendarRange size={19} strokeWidth={currentTab === 'templates' ? 2.5 : 1.5} />
          <span className="text-[10px] mt-1 font-medium">Kunlar</span>
        </button>

        {/* Technique */}
        <button
          onClick={() => onChangeTab('exercises')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
            currentTab === 'exercises'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 active:text-slate-300'
          }`}
        >
          <Video size={19} strokeWidth={currentTab === 'exercises' ? 2.5 : 1.5} />
          <span className="text-[10px] mt-1 font-medium">Texnika</span>
        </button>

        {/* History */}
        <button
          onClick={() => onChangeTab('history')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
            currentTab === 'history'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-500 active:text-slate-300'
          }`}
        >
          <History size={19} strokeWidth={currentTab === 'history' ? 2.5 : 1.5} />
          <span className="text-[10px] mt-1 font-medium">Tarix</span>
        </button>
      </div>
    </nav>
  );
};
