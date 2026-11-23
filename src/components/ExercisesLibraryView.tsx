import React, { useState } from 'react';
import type { ExerciseItem } from '../types';
import { MUSCLE_GROUPS } from '../data/defaultExercises';
import { getExerciseShortsUrl, getExerciseThumbnailUrl } from '../utils/youtube';
import { Search, Play, Info, Plus, Zap } from 'lucide-react';

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
  const [failedThumbs, setFailedThumbs] = useState<Record<string, boolean>>({});

  const filtered = exercises.filter((ex) => {
    const matchesSearch =
      ex.nameUz.toLowerCase().includes(search.toLowerCase()) ||
      ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || ex.muscleGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="space-y-4 pb-24">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Mashq qidiring..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-[#12141c] border border-[#222636] rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
        <button
          onClick={() => setSelectedGroup('all')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-colors ${
            selectedGroup === 'all'
              ? 'bg-emerald-500 text-black'
              : 'bg-[#12141c] text-slate-400 border border-[#222636]'
          }`}
        >
          Barchasi
        </button>
        {MUSCLE_GROUPS.map((grp) => (
          <button
            key={grp.key}
            onClick={() => setSelectedGroup(grp.key)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold flex items-center gap-1 transition-colors ${
              selectedGroup === grp.key
                ? 'bg-emerald-500 text-black'
                : 'bg-[#12141c] text-slate-400 border border-[#222636]'
            }`}
          >
            <span>{grp.icon}</span>
            <span>{grp.labelUz.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Exercise cards */}
      <div className="space-y-2">
        {filtered.map((exercise) => {
          const thumbnailUrl = getExerciseThumbnailUrl(exercise);
          const shortsUrl = getExerciseShortsUrl(exercise);

          return (
            <div
              key={exercise.id}
              className="bg-[#12141c] border border-[#222636] hover:border-[#2f354a] rounded-xl overflow-hidden flex transition-all"
            >
              {/* Thumbnail — 1 tap directly to YouTube Shorts! */}
              <a
                href={shortsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-28 sm:w-32 flex-shrink-0 bg-[#0d0e14] block group overflow-hidden"
                title="30-soniyalik YouTube Shorts'da ko'rish"
              >
                {thumbnailUrl && !failedThumbs[exercise.id] ? (
                  <>
                    <img
                      src={thumbnailUrl}
                      alt={exercise.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all"
                      loading="lazy"
                      decoding="async"
                      onError={() =>
                        setFailedThumbs((prev) => ({ ...prev, [exercise.id]: true }))
                      }
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-md">
                        <Play size={12} className="ml-0.5 fill-white text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-white bg-red-600/90 px-1.5 py-0.5 rounded mt-1.5 flex items-center gap-0.5">
                        <Zap size={9} className="fill-white" /> Shorts
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center min-h-[76px] text-slate-600">
                    <Play size={16} />
                    <span className="text-[9px] font-bold mt-1 text-slate-500">Shorts</span>
                  </div>
                )}
              </a>

              {/* Info */}
              <div className="flex-1 p-3 flex flex-col justify-between min-h-[76px]">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#181b26] text-slate-400">
                      {exercise.muscleGroup}
                    </span>
                    <a
                      href={shortsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-bold text-red-400 hover:text-red-300 flex items-center gap-0.5"
                    >
                      <Zap size={10} className="fill-red-400" /> 30s
                    </a>
                  </div>
                  <h3 
                    className="text-[13px] font-bold text-white leading-snug cursor-pointer hover:text-emerald-400 transition-colors"
                    onClick={() => onOpenTechnique(exercise)}
                  >
                    {exercise.nameUz}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#1a1d2a]">
                  <button
                    onClick={() => onOpenTechnique(exercise)}
                    className="text-[10px] text-slate-400 hover:text-emerald-400 font-medium flex items-center gap-1 transition-colors"
                  >
                    <Info size={12} /> Texnika & Qoidalar
                  </button>
                  {onSelectForWorkout && (
                    <button
                      onClick={() => onSelectForWorkout(exercise)}
                      className="px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-[10px] flex items-center gap-1 transition-colors"
                    >
                      <Plus size={11} /> Qo'shish
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
