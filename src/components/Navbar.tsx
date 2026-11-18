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
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-neutral-950/95 border-t border-neutral-800/80 backdrop-blur-lg px-4 py-2 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-1">
        {/* Workout Tab */}
        <button
          onClick={() => onChangeTab('workout')}
          className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
            currentTab === 'workout'
              ? 'text-emerald-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300 font-medium'
          }`}
        >
          {isWorkoutActive && (
            <span className="absolute top-1.5 right-6 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          )}
          <Dumbbell size={20} className={currentTab === 'workout' ? 'stroke-[2.5]' : ''} />
          <span className="text-[11px] mt-1">Mashg'ulot</span>
        </button>

        {/* Exercises Library & Video Tab */}
        <button
          onClick={() => onChangeTab('exercises')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
            currentTab === 'exercises'
              ? 'text-red-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300 font-medium'
          }`}
        >
          <Video size={20} className={currentTab === 'exercises' ? 'stroke-[2.5]' : ''} />
          <span className="text-[11px] mt-1">Mashq & Video</span>
        </button>

        {/* History & Records Tab */}
        <button
          onClick={() => onChangeTab('history')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
            currentTab === 'history'
              ? 'text-amber-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300 font-medium'
          }`}
        >
          <History size={20} className={currentTab === 'history' ? 'stroke-[2.5]' : ''} />
          <span className="text-[11px] mt-1">Tarix & PR</span>
        </button>
      </div>
    </nav>
  );
};
