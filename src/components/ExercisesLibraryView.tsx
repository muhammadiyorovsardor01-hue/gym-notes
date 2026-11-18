import React, { useState } from 'react';
import type { ExerciseItem } from '../types';
import { MUSCLE_GROUPS } from '../data/defaultExercises';
import { Search, Play, Video, Info, Plus } from 'lucide-react';

interface ExercisesLibraryViewProps {
  exercises: ExerciseItem[];
  onOpenTechnique: (exercise: ExerciseItem) => void;
  onSelectForWorkout?: (exercise: ExerciseItem) => void;
}

export const ExercisesLibraryView: React.FC<ExercisesLibraryViewProps> = ({
  exercises,
  onOpenTechnique,
  onSelectForWorkout,
}) => {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const filtered = exercises.filter((ex) => {
    const matchesSearch =
      ex.nameUz.toLowerCase().includes(search.toLowerCase()) ||
      ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || ex.muscleGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="space-y-5 pb-28">
      {/* View Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
            <Video size={24} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Mashqlar va Texnika</h2>
            <p className="text-xs text-neutral-400">
              Har bir mashqni to'g'ri bajarish qoidalari va YouTube video qo'llanmalari
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mt-4">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Mashq nomini qidiring (masalan: Otjimaniya, Squat, Bench...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700/60 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        {/* Muscle group filter pills */}
        <div className="flex gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedGroup('all')}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
              selectedGroup === 'all'
                ? 'bg-red-500 text-white font-bold shadow-md shadow-red-500/20'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Barchasi ({exercises.length})
          </button>
          {MUSCLE_GROUPS.map((grp) => (
            <button
              key={grp.key}
              onClick={() => setSelectedGroup(grp.key)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                selectedGroup === grp.key
                  ? 'bg-red-500 text-white font-bold shadow-md shadow-red-500/20'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <span>{grp.icon}</span>
              <span>{grp.labelUz.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Exercises */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filtered.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => onOpenTechnique(exercise)}
            className="group bg-neutral-900 border border-neutral-800/90 hover:border-neutral-700 p-4 rounded-2xl cursor-pointer transition-all hover:shadow-xl hover:shadow-neutral-950/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-400 group-hover:text-neutral-300">
                  {exercise.muscleGroup}
                </span>
                <span className="text-xs text-red-400 font-medium flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Play size={12} className="fill-red-400" /> Video bor
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                {exercise.nameUz}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5 mb-3">{exercise.name}</p>

              {/* Snippet of cues */}
              {exercise.cues && exercise.cues.length > 0 && (
                <p className="text-xs text-neutral-300 line-clamp-2 bg-neutral-950/40 p-2.5 rounded-xl border border-neutral-800/60 mb-3">
                  💡 {exercise.cues[0]}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60 mt-auto">
              <span className="text-xs text-neutral-400 font-medium flex items-center gap-1 group-hover:text-white transition-colors">
                <Info size={14} /> To'liq texnikani ko'rish
              </span>

              {onSelectForWorkout && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectForWorkout(exercise);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-semibold text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus size={13} /> Mashg'ulotga
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
