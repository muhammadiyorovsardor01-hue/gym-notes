import React, { useState, useEffect } from 'react';
import type { WorkoutSession, ExerciseSet, ExerciseItem } from '../types';
import { 
  Play, 
  Check, 
  Trash2, 
  Plus, 
  Info, 
  Timer, 
  Flame, 
  Dumbbell, 
  Minus
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

  // Timer logic for workout duration
  useEffect(() => {
    if (!workout) {
      setElapsedSeconds(0);
      return;
    }

    const start = workout.startTime;
    const updateElapsed = () => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - start) / 1000)));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [workout]);

  if (!workout) {
    return (
      <div className="py-12 sm:py-20 flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/5">
          <Dumbbell size={40} className="transform -rotate-45" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Mashg'ulotni boshlaymizmi?
        </h2>
        <p className="text-sm text-neutral-400 mb-8 max-w-xs">
          Mashqlarni belgilang, toshlar vazni va takrorlarni qayd etib boring. Har bir yutuq saqlanadi!
        </p>

        <button
          onClick={onStartNewWorkout}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95"
        >
          <Play size={20} className="fill-black" /> Mashg'ulotni boshlash
        </button>
      </div>
    );
  }

  const formatDuration = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Add a new set to an exercise
  const handleAddSet = (exerciseIndex: number) => {
    const updated = { ...workout };
    const we = updated.exercises[exerciseIndex];
    const lastSet = we.sets[we.sets.length - 1];

    const newSet: ExerciseSet = {
      id: `set-${Date.now()}-${Math.random()}`,
      setNumber: we.sets.length + 1,
      weight: lastSet ? lastSet.weight : 20,
      reps: lastSet ? lastSet.reps : 10,
      completed: false,
      type: 'regular',
    };

    we.sets.push(newSet);
    onUpdateWorkout(updated);
  };

  // Remove set
  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    const updated = { ...workout };
    const we = updated.exercises[exerciseIndex];
    we.sets.splice(setIndex, 1);
    // re-number remaining sets
    we.sets.forEach((s, idx) => {
      s.setNumber = idx + 1;
    });
    onUpdateWorkout(updated);
  };

  // Update set details (weight, reps, completed)
  const handleUpdateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof ExerciseSet,
    value: unknown
  ) => {
    const updated = { ...workout };
    const targetSet = updated.exercises[exerciseIndex].sets[setIndex];
    
    // If completing the set, trigger the rest timer
    if (field === 'completed' && value === true && !targetSet.completed) {
      onTriggerRestTimer();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (targetSet as any)[field] = value;
    onUpdateWorkout(updated);
  };

  // Adjust numeric value with quick + / - buttons
  const handleAdjustValue = (
    exerciseIndex: number,
    setIndex: number,
    field: 'weight' | 'reps',
    delta: number
  ) => {
    const currentVal = workout.exercises[exerciseIndex].sets[setIndex][field] || 0;
    const newVal = Math.max(0, currentVal + delta);
    handleUpdateSet(exerciseIndex, setIndex, field, newVal);
  };

  // Remove an exercise from the current workout
  const handleRemoveExercise = (exerciseIndex: number) => {
    if (confirm("Ushbu mashqni mashg'ulotdan olib tashlamoqchimisiz?")) {
      const updated = { ...workout };
      updated.exercises.splice(exerciseIndex, 1);
      onUpdateWorkout(updated);
    }
  };

  // Total volume calculation
  let totalVolume = 0;
  let totalSetsCount = 0;
  workout.exercises.forEach((we) => {
    we.sets.forEach((s) => {
      if (s.completed) {
        totalVolume += (s.weight || 0) * (s.reps || 0);
        totalSetsCount += 1;
      }
    });
  });

  return (
    <div className="space-y-6 pb-28">
      {/* Active Workout Header Bar */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 sticky top-3 z-20 backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div>
          <input
            type="text"
            value={workout.title}
            onChange={(e) => onUpdateWorkout({ ...workout, title: e.target.value })}
            className="text-lg sm:text-xl font-extrabold text-white bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-emerald-500 focus:outline-none transition-colors"
          />
          <div className="flex items-center gap-4 text-xs text-neutral-400 mt-1">
            <span className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold">
              <Timer size={14} /> {formatDuration(elapsedSeconds)}
            </span>
            <span className="flex items-center gap-1">
              <Flame size={14} className="text-amber-500" /> {totalVolume.toLocaleString()} kg yuk
            </span>
            <span>{totalSetsCount} set bajarildi</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCancelWorkout}
            className="px-3 py-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors"
          >
            Bekor qilish
          </button>
          <button
            onClick={onFinishWorkout}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
          >
            <Check size={16} /> Yakunlash
          </button>
        </div>
      </div>

      {/* Exercises in current workout */}
      {workout.exercises.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-neutral-800 rounded-2xl text-center space-y-4">
          <p className="text-sm text-neutral-400">
            Hozircha hech qanday mashq qo'shilmagan.
          </p>
          <button
            onClick={onOpenExerciseSelector}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-bold transition-all"
          >
            <Plus size={16} /> Birinchi mashqni qo'shish
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {workout.exercises.map((we, exIdx) => {
            const pr = previousRecords[we.exerciseId];

            return (
              <div
                key={we.id}
                className="bg-neutral-900 border border-neutral-800/90 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4"
              >
                {/* Exercise Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                        {we.exercise.muscleGroup}
                      </span>
                      {pr && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          🏆 Rekord: {pr.maxWeight} kg
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {we.exercise.nameUz}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* View Technique Button */}
                    <button
                      onClick={() => onOpenTechnique(we.exercise)}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-emerald-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      title="To'g'ri texnika va videoni ko'rish"
                    >
                      <Info size={15} />
                      <span className="hidden sm:inline">Texnika</span>
                    </button>
                    {/* Delete exercise */}
                    <button
                      onClick={() => handleRemoveExercise(exIdx)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                      title="Mashqni olib tashlash"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Sets Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-neutral-500 font-semibold border-b border-neutral-800/80">
                        <th className="py-2 px-1 text-center w-10">SET</th>
                        <th className="py-2 px-2 text-center">TOSH (KG)</th>
                        <th className="py-2 px-2 text-center">TAKROR</th>
                        <th className="py-2 px-2 text-center w-14">BAJARILDI</th>
                        <th className="py-2 px-1 text-center w-8"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/50">
                      {we.sets.map((set, setIdx) => (
                        <tr 
                          key={set.id}
                          className={`transition-colors ${
                            set.completed ? 'bg-emerald-500/5' : 'hover:bg-neutral-800/30'
                          }`}
                        >
                          {/* Set number */}
                          <td className="py-3 px-1 text-center font-bold text-neutral-400">
                            {set.setNumber}
                          </td>

                          {/* Weight input with steppers */}
                          <td className="py-3 px-2">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleAdjustValue(exIdx, setIdx, 'weight', -2.5)}
                                className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 flex items-center justify-center"
                              >
                                <Minus size={11} />
                              </button>
                              <input
                                type="number"
                                step="0.5"
                                value={set.weight === 0 ? '' : set.weight}
                                placeholder="0"
                                onChange={(e) =>
                                  handleUpdateSet(
                                    exIdx,
                                    setIdx,
                                    'weight',
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="w-14 sm:w-16 py-1 text-center font-mono font-bold bg-neutral-800/90 border border-neutral-700/60 rounded-lg text-white focus:outline-none focus:border-emerald-500 text-sm"
                              />
                              <button
                                onClick={() => handleAdjustValue(exIdx, setIdx, 'weight', 2.5)}
                                className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 flex items-center justify-center"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                          </td>

                          {/* Reps input with steppers */}
                          <td className="py-3 px-2">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleAdjustValue(exIdx, setIdx, 'reps', -1)}
                                className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 flex items-center justify-center"
                              >
                                <Minus size={11} />
                              </button>
                              <input
                                type="number"
                                value={set.reps === 0 ? '' : set.reps}
                                placeholder="0"
                                onChange={(e) =>
                                  handleUpdateSet(
                                    exIdx,
                                    setIdx,
                                    'reps',
                                    parseInt(e.target.value, 10) || 0
                                  )
                                }
                                className="w-12 sm:w-14 py-1 text-center font-mono font-bold bg-neutral-800/90 border border-neutral-700/60 rounded-lg text-white focus:outline-none focus:border-emerald-500 text-sm"
                              />
                              <button
                                onClick={() => handleAdjustValue(exIdx, setIdx, 'reps', 1)}
                                className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 flex items-center justify-center"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                          </td>

                          {/* Checkbox button */}
                          <td className="py-3 px-2 text-center">
                            <button
                              onClick={() =>
                                handleUpdateSet(exIdx, setIdx, 'completed', !set.completed)
                              }
                              className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto transition-all ${
                                set.completed
                                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105'
                                  : 'bg-neutral-800 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-700'
                              }`}
                              title={set.completed ? "Bajarildi deb belgilangan" : "Bajarildi deb belgilash"}
                            >
                              <Check size={18} className={set.completed ? 'stroke-[3]' : ''} />
                            </button>
                          </td>

                          {/* Remove set */}
                          <td className="py-3 px-1 text-center">
                            <button
                              onClick={() => handleRemoveSet(exIdx, setIdx)}
                              className="text-neutral-600 hover:text-red-400 p-1 transition-colors"
                              title="Setni o'chirish"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add set button */}
                <button
                  onClick={() => handleAddSet(exIdx)}
                  className="w-full py-2 rounded-xl bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-800"
                >
                  <Plus size={14} /> Yangi set qo'shish
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add more exercises button */}
      <button
        onClick={onOpenExerciseSelector}
        className="w-full py-3.5 rounded-2xl bg-neutral-800/80 hover:bg-neutral-800 text-emerald-400 hover:text-emerald-300 font-bold text-sm border border-neutral-700/60 flex items-center justify-center gap-2 transition-all shadow-sm"
      >
        <Plus size={18} /> Yana mashq qo'shish
      </button>
    </div>
  );
};
