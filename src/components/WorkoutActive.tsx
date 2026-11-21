import React, { useState, useEffect } from 'react';
import type { WorkoutSession, ExerciseSet, ExerciseItem } from '../types';
import { getExerciseShortsUrl } from '../utils/youtube';
import { 
  Play, Check, Trash2, Plus, Info, Timer, Flame, Dumbbell, Minus, Zap
} from 'lucide-react';

interface WorkoutActiveProps {
  workout: WorkoutSession | null;
  onStartNewWorkout: () => void;
  onUpdateWorkout: (workout: WorkoutSession) => void;
  onFinishWorkout: () => void;
  onCancelWorkout: () => void;
  onOpenExerciseSelector: () => void;
  onOpenTechnique: (exercise: ExerciseItem) => void;
  onTriggerRestTimer: () => void;
  previousRecords: Record<string, { maxWeight: number; maxRepsAtMaxWeight: number }>;
}

export const WorkoutActive: React.FC<WorkoutActiveProps> = ({
  workout,
  onStartNewWorkout,
  onUpdateWorkout,
  onFinishWorkout,
  onCancelWorkout,
  onOpenExerciseSelector,
  onOpenTechnique,
  onTriggerRestTimer,
  previousRecords,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!workout) { setElapsedSeconds(0); return; }
    const start = workout.startTime;
    const updateElapsed = () => setElapsedSeconds(Math.max(0, Math.floor((Date.now() - start) / 1000)));
    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [workout]);

  if (!workout) {
    return (
      <div className="py-16 flex flex-col items-center justify-center text-center px-6 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
          <Dumbbell size={32} className="transform -rotate-45" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1.5">
          Mashg'ulotni boshlash
        </h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Mashqlarni tanlang, vaznlarni yozing va natijalaringizni kuzatib boring.
        </p>
        <button
          onClick={onStartNewWorkout}
          className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
        >
          <Play size={18} className="fill-black" /> Boshlash
        </button>
      </div>
    );
  }

  const formatDuration = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddSet = (exIdx: number) => {
    if (!workout) return;
    const we = workout.exercises[exIdx];
    const last = we.sets[we.sets.length - 1];
    const newSet: ExerciseSet = {
      id: `set-${Date.now()}-${Math.random()}`,
      setNumber: we.sets.length + 1,
      weight: last ? last.weight : 20,
      reps: last ? last.reps : 10,
      completed: false,
      type: 'regular',
    };

    const updated: WorkoutSession = {
      ...workout,
      exercises: workout.exercises.map((ex, eIdx) => {
        if (eIdx !== exIdx) return ex;
        return {
          ...ex,
          sets: [...ex.sets, newSet],
        };
      }),
    };
    onUpdateWorkout(updated);
  };

  const handleRemoveSet = (exIdx: number, setIdx: number) => {
    if (!workout) return;
    const updated: WorkoutSession = {
      ...workout,
      exercises: workout.exercises.map((ex, eIdx) => {
        if (eIdx !== exIdx) return ex;
        const newSets = ex.sets.filter((_, sIdx) => sIdx !== setIdx).map((s, i) => ({
          ...s,
          setNumber: i + 1,
        }));
        return {
          ...ex,
          sets: newSets,
        };
      }),
    };
    onUpdateWorkout(updated);
  };

  const handleUpdateSet = (exIdx: number, setIdx: number, field: keyof ExerciseSet, value: unknown) => {
    if (!workout) return;
    const target = workout.exercises[exIdx]?.sets[setIdx];
    if (field === 'completed' && value === true && target && !target.completed) {
      onTriggerRestTimer();
    }

    const updated: WorkoutSession = {
      ...workout,
      exercises: workout.exercises.map((ex, eIdx) => {
        if (eIdx !== exIdx) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s, sIdx) => {
            if (sIdx !== setIdx) return s;
            return {
              ...s,
              [field]: value,
            };
          }),
        };
      }),
    };
    onUpdateWorkout(updated);
  };

  const handleAdjust = (exIdx: number, setIdx: number, field: 'weight' | 'reps', delta: number) => {
    const cur = workout?.exercises[exIdx]?.sets[setIdx]?.[field] || 0;
    handleUpdateSet(exIdx, setIdx, field, Math.max(0, cur + delta));
  };

  const handleRemoveExercise = (exIdx: number) => {
    if (!workout) return;
    if (confirm("Mashqni olib tashlamoqchimisiz?")) {
      const updated: WorkoutSession = {
        ...workout,
        exercises: workout.exercises.filter((_, eIdx) => eIdx !== exIdx),
      };
      onUpdateWorkout(updated);
    }
  };

  let totalVolume = 0;
  let totalSetsCount = 0;
  workout.exercises.forEach(we => we.sets.forEach(s => {
    if (s.completed) { totalVolume += (s.weight || 0) * (s.reps || 0); totalSetsCount++; }
  }));

  return (
    <div className="space-y-4 pb-24">
      {/* Header bar */}
      <div className="bg-[#12141c] border border-[#222636] rounded-xl p-4 sticky top-14 z-20 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <input
              type="text"
              value={workout.title}
              onChange={(e) => onUpdateWorkout({ ...workout, title: e.target.value })}
              className="text-base font-bold text-white bg-transparent border-none focus:outline-none w-full"
            />
            <div className="flex items-center gap-4 text-[11px] text-slate-500 mt-1 font-mono-numbers">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Timer size={12} /> {formatDuration(elapsedSeconds)}
              </span>
              <span className="flex items-center gap-1">
                <Flame size={12} className="text-amber-500" /> {totalVolume.toLocaleString()} kg
              </span>
              <span>{totalSetsCount} set</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onCancelWorkout} className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-red-400 text-[11px] font-semibold">
              Bekor
            </button>
            <button onClick={onFinishWorkout} className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] flex items-center gap-1">
              <Check size={14} /> Yakunlash
            </button>
          </div>
        </div>
      </div>

      {/* Exercises */}
      {workout.exercises.length === 0 ? (
        <div className="p-8 border border-dashed border-[#222636] rounded-xl text-center space-y-3">
          <p className="text-sm text-slate-500">Mashq qo'shilmagan.</p>
          <button onClick={onOpenExerciseSelector} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Plus size={14} /> Mashq qo'shish
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {workout.exercises.map((we, exIdx) => {
            const pr = previousRecords[we.exerciseId];
            return (
              <div key={we.id} className="bg-[#12141c] border border-[#222636] rounded-xl p-4 space-y-3">
                {/* Exercise header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#181b26] text-slate-500">
                        {we.exercise.muscleGroup}
                      </span>
                      {pr && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                          PR: {pr.maxWeight} kg
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white">{we.exercise.nameUz}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <a
                      href={getExerciseShortsUrl(we.exercise)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-1 text-[11px] font-bold transition-colors"
                      title="30-soniyalik YouTube Shorts"
                    >
                      <Zap size={12} className="fill-red-400" />
                      <span>Shorts</span>
                    </a>
                    <button onClick={() => onOpenTechnique(we.exercise)} className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-white/5" title="Texnika">
                      <Info size={15} />
                    </button>
                    <button onClick={() => handleRemoveExercise(exIdx)} className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-white/5">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Sets */}
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="text-slate-600 font-semibold">
                      <th className="py-1.5 text-center w-8">SET</th>
                      <th className="py-1.5 text-center">KG</th>
                      <th className="py-1.5 text-center">REPS</th>
                      <th className="py-1.5 text-center w-12">✓</th>
                      <th className="py-1.5 w-6"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {we.sets.map((set, setIdx) => (
                      <tr key={set.id} className={set.completed ? 'bg-emerald-500/5' : ''}>
                        <td className="py-2 text-center font-bold text-slate-500 font-mono-numbers">{set.setNumber}</td>
                        <td className="py-2 px-1">
                          <div className="flex items-center justify-center gap-0.5">
                            <button onClick={() => handleAdjust(exIdx, setIdx, 'weight', -2.5)} className="w-6 h-7 rounded bg-[#181b26] hover:bg-[#1f2330] text-slate-500 flex items-center justify-center">
                              <Minus size={10} />
                            </button>
                            <input type="number" step="0.5" value={set.weight === 0 ? '' : set.weight} placeholder="0"
                              onChange={(e) => handleUpdateSet(exIdx, setIdx, 'weight', parseFloat(e.target.value) || 0)}
                              className="w-14 py-1.5 text-center font-mono-numbers font-bold bg-[#181b26] border border-[#222636] rounded-md text-white text-xs focus:outline-none focus:border-emerald-500"
                            />
                            <button onClick={() => handleAdjust(exIdx, setIdx, 'weight', 2.5)} className="w-6 h-7 rounded bg-[#181b26] hover:bg-[#1f2330] text-slate-500 flex items-center justify-center">
                              <Plus size={10} />
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-1">
                          <div className="flex items-center justify-center gap-0.5">
                            <button onClick={() => handleAdjust(exIdx, setIdx, 'reps', -1)} className="w-6 h-7 rounded bg-[#181b26] hover:bg-[#1f2330] text-slate-500 flex items-center justify-center">
                              <Minus size={10} />
                            </button>
                            <input type="number" value={set.reps === 0 ? '' : set.reps} placeholder="0"
                              onChange={(e) => handleUpdateSet(exIdx, setIdx, 'reps', parseInt(e.target.value, 10) || 0)}
                              className="w-12 py-1.5 text-center font-mono-numbers font-bold bg-[#181b26] border border-[#222636] rounded-md text-white text-xs focus:outline-none focus:border-emerald-500"
                            />
                            <button onClick={() => handleAdjust(exIdx, setIdx, 'reps', 1)} className="w-6 h-7 rounded bg-[#181b26] hover:bg-[#1f2330] text-slate-500 flex items-center justify-center">
                              <Plus size={10} />
                            </button>
                          </div>
                        </td>
                        <td className="py-2 text-center">
                          <button onClick={() => handleUpdateSet(exIdx, setIdx, 'completed', !set.completed)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all ${
                              set.completed ? 'bg-emerald-500 text-black' : 'bg-[#181b26] text-slate-600 hover:text-slate-300'
                            }`}>
                            <Check size={16} strokeWidth={set.completed ? 3 : 1.5} />
                          </button>
                        </td>
                        <td className="py-2 text-center">
                          <button onClick={() => handleRemoveSet(exIdx, setIdx)} className="text-slate-700 hover:text-red-400 p-0.5">
                            <Trash2 size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button onClick={() => handleAddSet(exIdx)} className="w-full py-2 rounded-lg bg-[#181b26] hover:bg-[#1f2330] text-slate-400 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors">
                  <Plus size={12} /> Set qo'shish
                </button>
              </div>
            );
          })}
        </div>
      )}

      <button onClick={onOpenExerciseSelector} className="w-full py-3 rounded-xl border border-dashed border-[#222636] hover:border-emerald-500/40 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors">
        <Plus size={16} /> Mashq qo'shish
      </button>
    </div>
  );
};
