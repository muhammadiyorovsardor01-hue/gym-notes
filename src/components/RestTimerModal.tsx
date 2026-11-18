import React, { useEffect, useState } from 'react';
import { Timer, X, Plus, Play, Pause, RotateCcw } from 'lucide-react';
import { playTimerCompletionSound } from '../utils/audio';

interface RestTimerProps {
  initialSeconds: number;
  isOpen: boolean;
  onClose: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({ initialSeconds, isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  // Sync when initialSeconds changes
  useEffect(() => {
    setTimeLeft(initialSeconds);
    setTotalSeconds(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            playTimerCompletionSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 100;

  const addTime = (secs: number) => {
    setTimeLeft(prev => prev + secs);
    setTotalSeconds(prev => Math.max(prev, timeLeft + secs));
  };

  const resetTimer = () => {
    setTimeLeft(initialSeconds);
    setTotalSeconds(initialSeconds);
    setIsRunning(true);
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 z-40 bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
      {/* Progress line */}
      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-3">
        <div 
          className="bg-emerald-500 h-full transition-all duration-500 ease-linear rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        {/* Left: Info */}
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${timeLeft === 0 ? 'bg-emerald-500/20 text-emerald-400 animate-bounce' : 'bg-neutral-800 text-neutral-300'}`}>
            <Timer size={22} />
          </div>
          <div>
            <div className="text-xs text-neutral-400 font-medium">Dam olish taymeri</div>
            <div className={`text-2xl font-mono font-bold tracking-wider ${timeLeft === 0 ? 'text-emerald-400' : 'text-white'}`}>
              {formattedTime}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => addTime(30)}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
            title="+30 soniya qo'shish"
          >
            <Plus size={14} /> 30s
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            title={isRunning ? "Pauza" : "Davom ettirish"}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={resetTimer}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
            title="Qayta boshlash"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors ml-1"
            title="Yopish"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
