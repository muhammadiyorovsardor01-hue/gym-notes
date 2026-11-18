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
  session, isOpen, onSaveAndClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.65 }, colors: ['#10b981', '#06b6d4', '#f59e0b'] });
      } catch (e) { console.warn('Confetti error', e); }
    }
  }, [isOpen]);

  if (!isOpen || !session) return null;

  const durationSecs = session.endTime && session.startTime ? Math.floor((session.endTime - session.startTime) / 1000) : 0;
  const mins = Math.floor(durationSecs / 60);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-sm bg-[#12141c] border border-[#222636] rounded-2xl p-6 text-center space-y-5">
        <div className="w-14 h-14 rounded-xl bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center">
          <Trophy size={28} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">Mashg'ulot yakunlandi</h2>
          <p className="text-xs text-slate-500 mt-1">Natijalar saqlandi</p>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-[#0d0e14] p-3 rounded-xl border border-[#1a1d2a]">
          <div>
            <div className="text-[9px] text-slate-600 font-semibold uppercase flex items-center justify-center gap-1"><Clock size={10} /> Vaqt</div>
            <div className="text-sm font-bold text-white font-mono-numbers mt-1">{mins} daq</div>
          </div>
          <div className="border-x border-[#1a1d2a]">
            <div className="text-[9px] text-slate-600 font-semibold uppercase flex items-center justify-center gap-1"><Flame size={10} /> Tonnaj</div>
            <div className="text-sm font-bold text-amber-400 font-mono-numbers mt-1">{session.totalVolume.toLocaleString()} kg</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-600 font-semibold uppercase flex items-center justify-center gap-1"><Dumbbell size={10} /> Set</div>
            <div className="text-sm font-bold text-emerald-400 font-mono-numbers mt-1">{session.totalSets}</div>
          </div>
        </div>

        <div className="text-left space-y-1.5 max-h-40 overflow-y-auto">
          {session.exercises.map((we, idx) => {
            const done = we.sets.filter(s => s.completed);
            const maxW = done.reduce((m, s) => Math.max(m, s.weight || 0), 0);
            return (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#0d0e14] border border-[#1a1d2a] text-[11px]">
                <span className="font-medium text-white truncate max-w-[180px]">{we.exercise.nameUz}</span>
                <div className="text-slate-500 font-mono-numbers flex items-center gap-2">
                  <span>{done.length}s</span>
                  {maxW > 0 && <span className="text-emerald-400 font-semibold">{maxW}kg</span>}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onSaveAndClose} className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
          Saqlash <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
