import React, { useEffect, useRef, useState } from 'react';
import type { ExerciseDifficulty } from '../types';
import { Timer, X, Plus, Minus, Play, Pause, RotateCcw } from 'lucide-react';
import { playTimerCompletionSound } from '../utils/audio';
import { MAX_REST_SECONDS } from '../utils/restTimer';

interface RestTimerProps {
  initialSeconds: number;
  triggerKey: number;
  exerciseName?: string;
  difficultyLabel?: string;
  difficulty?: ExerciseDifficulty;
  isOpen: boolean;
  onClose: () => void;
}

const DIFFICULTY_BADGE_STYLES: Record<ExerciseDifficulty, string> = {
  heavy: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  medium: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  light: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
};

export const RestTimer: React.FC<RestTimerProps> = ({
  initialSeconds,
  triggerKey,
  exerciseName,
  difficultyLabel,
  difficulty = 'medium',
  isOpen,
  onClose,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  const endTimeRef = useRef<number | null>(null);
  const hasPlayedSoundRef = useRef(false);

  // Sync and restart timer on open or new trigger
  useEffect(() => {
    if (!isOpen) {
      endTimeRef.current = null;
      return;
    }

    setTimeLeft(initialSeconds);
    setTotalSeconds(initialSeconds);
    setIsRunning(true);
    endTimeRef.current = Date.now() + initialSeconds * 1000;
    hasPlayedSoundRef.current = false;
  }, [initialSeconds, triggerKey, isOpen]);

  // Accurate timestamp-based countdown interval
  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const interval = setInterval(() => {
      const remaining = endTimeRef.current
        ? Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000))
        : 0;

      setTimeLeft(remaining);

      if (remaining === 0) {
        if (!hasPlayedSoundRef.current) {
          hasPlayedSoundRef.current = true;
          playTimerCompletionSound();
        }
        setIsRunning(false);
        endTimeRef.current = null;
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen, isRunning]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const progressPercent =
    totalSeconds > 0 ? Math.min(100, ((totalSeconds - timeLeft) / totalSeconds) * 100) : 100;

  const adjustTime = (delta: number) => {
    const next = Math.min(MAX_REST_SECONDS, Math.max(5, timeLeft + delta));
    setTimeLeft(next);
    setTotalSeconds((prev) => Math.max(prev, next));
    hasPlayedSoundRef.current = false;
    if (isRunning) {
      endTimeRef.current = Date.now() + next * 1000;
    }
  };

  const togglePlayPause = () => {
    if (isRunning) {
      setIsRunning(false);
      endTimeRef.current = null;
      return;
    }

    if (timeLeft === 0) {
      setTimeLeft(initialSeconds);
      setTotalSeconds(initialSeconds);
      endTimeRef.current = Date.now() + initialSeconds * 1000;
      hasPlayedSoundRef.current = false;
      setIsRunning(true);
    } else {
      endTimeRef.current = Date.now() + timeLeft * 1000;
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setTimeLeft(initialSeconds);
    setTotalSeconds(initialSeconds);
    endTimeRef.current = Date.now() + initialSeconds * 1000;
    hasPlayedSoundRef.current = false;
    setIsRunning(true);
  };

  return (
    <div className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 z-40 bg-[#12141c]/98 backdrop-blur-md border border-[#222636] rounded-2xl p-4 shadow-2xl">
      {/* Progress bar */}
      <div className="w-full bg-[#181b26] h-1.5 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full transition-all duration-200 ease-linear rounded-full ${
            timeLeft === 0 ? 'bg-emerald-400' : 'bg-emerald-500'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Top row: Exercise name + difficulty pill */}
      {(exerciseName || difficultyLabel) && (
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-medium text-slate-400 truncate">
            {exerciseName || 'Mashq'}
          </span>
          {difficultyLabel && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex-shrink-0 ${DIFFICULTY_BADGE_STYLES[difficulty]}`}
            >
              {difficultyLabel}
            </span>
          )}
        </div>
      )}

      {/* Main row */}
      <div className="flex items-center justify-between gap-2">
        {/* Left: Timer display */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`p-2 rounded-xl flex-shrink-0 ${
              timeLeft === 0
                ? 'bg-emerald-500/20 text-emerald-400 animate-bounce'
                : 'bg-[#181b26] text-slate-300 border border-[#222636]'
            }`}
          >
            <Timer size={20} />
          </div>
          <div className="min-w-0">
            <div
              className={`text-[11px] font-medium truncate ${
                timeLeft === 0 ? 'text-emerald-400 font-semibold' : 'text-slate-400'
              }`}
            >
              {timeLeft === 0 ? 'Tayyor — keyingi set!' : 'Dam olish'}
            </div>
            <div
              className={`text-2xl font-mono-numbers font-bold tracking-tight leading-none mt-0.5 ${
                timeLeft === 0 ? 'text-emerald-400' : 'text-white'
              }`}
            >
              {formattedTime}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => adjustTime(-15)}
            className="px-2 py-1.5 rounded-lg bg-[#181b26] hover:bg-[#1f2330] border border-[#222636] text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-0.5 transition-colors"
            title="-15 soniya"
          >
            <Minus size={12} /> 15s
          </button>

          <button
            onClick={() => adjustTime(15)}
            className="px-2 py-1.5 rounded-lg bg-[#181b26] hover:bg-[#1f2330] border border-[#222636] text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-0.5 transition-colors"
            title="+15 soniya"
          >
            <Plus size={12} /> 15s
          </button>

          <button
            onClick={togglePlayPause}
            className="p-2 rounded-lg bg-[#181b26] hover:bg-[#1f2330] border border-[#222636] text-slate-300 hover:text-white transition-colors"
            title={isRunning ? 'Pauza' : 'Davom ettirish'}
          >
            {isRunning ? <Pause size={14} /> : <Play size={14} />}
          </button>

          <button
            onClick={resetTimer}
            className="p-2 rounded-lg bg-[#181b26] hover:bg-[#1f2330] border border-[#222636] text-slate-400 hover:text-white transition-colors"
            title="Qayta boshlash"
          >
            <RotateCcw size={14} />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#181b26] hover:bg-red-500/15 border border-[#222636] text-slate-400 hover:text-red-400 transition-colors"
            title="Yopish"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
