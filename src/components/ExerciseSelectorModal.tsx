import React, { useState } from 'react';
import type { ExerciseItem, MuscleGroup } from '../types';
import { MUSCLE_GROUPS } from '../data/defaultExercises';
import { Search, X, Plus, Info, Dumbbell } from 'lucide-react';

interface ExerciseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercises: ExerciseItem[];
  onSelectExercise: (exercise: ExerciseItem) => void;
  onOpenTechnique: (exercise: ExerciseItem) => void;
  onAddNewCustomExercise: (newEx: ExerciseItem) => void;
}

export const ExerciseSelectorModal: React.FC<ExerciseSelectorModalProps> = ({
  isOpen,
  onClose,
  exercises,
  onSelectExercise,
  onOpenTechnique,
  onAddNewCustomExercise,
}) => {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Custom Exercise form state
  const [customName, setCustomName] = useState('');
  const [customGroup, setCustomGroup] = useState<MuscleGroup>('chest');

  if (!isOpen) return null;

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.nameUz.toLowerCase().includes(search.toLowerCase()) ||
      ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || ex.muscleGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newEx: ExerciseItem = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      nameUz: customName.trim(),
      muscleGroup: customGroup,
      cues: ["Ushbu mashqni to'g'ri texnika va nazorat bilan bajaring."],
      mistakes: ["Kuchsizlantiruvchi og'irliklardan qoching."],
      youtubeQuery: `${customName.trim()} workout form`,
      isCustom: true,
    };

    onAddNewCustomExercise(newEx);
    onSelectExercise(newEx);
    setCustomName('');
    setShowCreateModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-2xl h-[88vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Dumbbell size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Mashq tanlash</h3>
              <p className="text-xs text-neutral-400">Mashg'ulotga mashq qo'shing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800/60 hover:bg-neutral-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search & Action bar */}
        <div className="p-4 border-b border-neutral-800 space-y-3 bg-neutral-950/40">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Mashq nomini qidiring (masalan: Otjimaniya, Bench...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/70 border border-neutral-700/60 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Muscle Group Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedGroup('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedGroup === 'all'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              Barchasi ({exercises.length})
            </button>
            {MUSCLE_GROUPS.map((grp) => {
              const count = exercises.filter((x) => x.muscleGroup === grp.key).length;
              return (
                <button
                  key={grp.key}
                  onClick={() => setSelectedGroup(grp.key)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 transition-colors ${
                    selectedGroup === grp.key
                      ? 'bg-emerald-500 text-black font-semibold'
                      : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <span>{grp.icon}</span>
                  <span>{grp.labelUz.split(' ')[0]}</span>
                  <span className="opacity-60 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredExercises.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 space-y-3">
              <p className="text-sm">Bunday mashq topilmadi.</p>
              <button
                onClick={() => {
                  setCustomName(search);
                  setShowCreateModal(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-semibold"
              >
                <Plus size={16} /> Yangi mashq sifatida qo'shish
              </button>
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="group p-3 rounded-xl bg-neutral-800/40 hover:bg-neutral-800/80 border border-neutral-800/70 hover:border-neutral-700 flex items-center justify-between transition-all"
              >
                <div 
                  className="flex-1 cursor-pointer pr-3"
                  onClick={() => {
                    onSelectExercise(exercise);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase tracking-wider">
                      {exercise.muscleGroup}
                    </span>
                    {exercise.isCustom && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">
                        Custom
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {exercise.nameUz}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{exercise.name}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenTechnique(exercise)}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-emerald-400 transition-colors"
                    title="To'g'ri texnikani ko'rish"
                  >
                    <Info size={17} />
                  </button>
                  <button
                    onClick={() => {
                      onSelectExercise(exercise);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <Plus size={15} /> Qo'shish
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Create Custom Exercise Button */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-900">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full py-2.5 rounded-xl border border-dashed border-neutral-700 hover:border-emerald-500 text-neutral-300 hover:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={16} /> Ro'yxatda yo'q yangi mashq qo'shish
          </button>
        </div>

        {/* Modal for creating custom exercise */}
        {showCreateModal && (
          <div className="absolute inset-0 bg-neutral-950/90 z-20 flex flex-col p-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <h4 className="font-bold text-white text-base">Yangi maxsus mashq yaratish</h4>
              <button onClick={() => setShowCreateModal(false)} className="text-neutral-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Mashq nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Gantel bilan oldinga lunge..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Mushak guruhi
                </label>
                <select
                  value={customGroup}
                  onChange={(e) => setCustomGroup(e.target.value as MuscleGroup)}
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  {MUSCLE_GROUPS.map((g) => (
                    <option key={g.key} value={g.key}>
                      {g.labelUz}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold"
                >
                  Saqlash va Qo'shish
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
