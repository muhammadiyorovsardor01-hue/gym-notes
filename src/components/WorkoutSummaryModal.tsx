import React, { useEffect } from 'react';
import type { WorkoutSession } from '../types';
import confetti from 'canvas-confetti';
import { Trophy, Clock, Flame, Dumbbell, ArrowRight } from 'lucide-react';

interface WorkoutSummaryModalProps {
  session: WorkoutSession | null;
  isOpen: boolean;
  onSaveAndClose: () => void;
}

export const WorkoutSummaryModal: React.FC<WorkoutSummaryModalProps> = ({
  session,
  isOpen,
  onSaveAndClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#f59e0b', '#6366f1']
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !session) return null;

  const durationSecs = session.endTime && session.startTime 
    ? Math.floor((session.endTime - session.startTime) / 1000) 
    : 0;
  const mins = Math.floor(durationSecs / 60);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div 
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Trophy Icon */}
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10 animate-bounce">
            <Trophy size={32} />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Ajoyib natija!
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Mashg'ulot yakunlandi 🎉
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Bugun yana bir qadam oldinga siljidingiz!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 bg-neutral-950/60 p-3.5 rounded-2xl border border-neutral-800/80">
            <div className="space-y-1">
              <div className="text-[10px] text-neutral-500 font-semibold uppercase flex items-center justify-center gap-1">
                <Clock size={12} /> Vaqt
              </div>
              <div className="text-base font-bold text-white font-mono">
                {mins} daq
              </div>
            </div>

            <div className="space-y-1 border-x border-neutral-800/80">
              <div className="text-[10px] text-neutral-500 font-semibold uppercase flex items-center justify-center gap-1">
                <Flame size={12} className="text-amber-500" /> Tonnaj
              </div>
              <div className="text-base font-bold text-amber-400 font-mono">
                {session.totalVolume.toLocaleString()} kg
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] text-neutral-500 font-semibold uppercase flex items-center justify-center gap-1">
                <Dumbbell size={12} className="text-emerald-400" /> Setlar
              </div>
              <div className="text-base font-bold text-emerald-400 font-mono">
                {session.totalSets}
              </div>
            </div>
          </div>

          {/* Completed exercises list */}
          <div className="text-left space-y-2 max-h-48 overflow-y-auto pr-1">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Bajarilgan mashqlar:
            </div>
            {session.exercises.map((we, idx) => {
              const completedSets = we.sets.filter(s => s.completed);
              const maxWeight = completedSets.reduce((max, s) => Math.max(max, s.weight || 0), 0);

              return (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-neutral-800/40 text-xs border border-neutral-800"
                >
                  <span className="font-medium text-white truncate max-w-[200px]">
                    {we.exercise.nameUz}
                  </span>
                  <div className="text-neutral-400 font-mono text-[11px] flex items-center gap-2">
                    <span>{completedSets.length} set</span>
                    {maxWeight > 0 && (
                      <span className="text-emerald-400 font-bold">Max: {maxWeight} kg</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button */}
          <button
            onClick={onSaveAndClose}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            <span>Tarixga saqlash va tamomlash</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
