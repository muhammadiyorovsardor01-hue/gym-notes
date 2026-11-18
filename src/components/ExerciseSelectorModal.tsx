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
  isOpen, onClose, exercises, onSelectExercise, onOpenTechnique, onAddNewCustomExercise,
}) => {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customGroup, setCustomGroup] = useState<MuscleGroup>('chest');

  if (!isOpen) return null;

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.nameUz.toLowerCase().includes(search.toLowerCase()) || ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || ex.muscleGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const newEx: ExerciseItem = {
      id: `custom-${Date.now()}`, name: customName.trim(), nameUz: customName.trim(),
      muscleGroup: customGroup,
      cues: ["To'g'ri texnika va nazorat bilan bajaring."],
      mistakes: ["Haddan tashqari og'ir vaznlardan qoching."],
      youtubeQuery: `${customName.trim()} exercise form`, isCustom: true,
    };
    onAddNewCustomExercise(newEx);
    onSelectExercise(newEx);
    setCustomName('');
    setShowCreateModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4" onClick={onClose}>
      <div className="w-full max-w-xl bg-[#12141c] border border-[#222636] rounded-t-2xl sm:rounded-2xl h-[85vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b border-[#222636] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400"><Dumbbell size={18} /></div>
            <h3 className="text-sm font-bold text-white">Mashq tanlash</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-white/5"><X size={18} /></button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-[#222636] space-y-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Qidirish..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#181b26] border border-[#222636] rounded-lg text-white placeholder-slate-600 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto no-scrollbar text-[10px]">
            <button onClick={() => setSelectedGroup('all')}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap font-semibold ${selectedGroup === 'all' ? 'bg-emerald-500 text-black' : 'bg-[#181b26] text-slate-400'}`}>
              Barchasi
            </button>
            {MUSCLE_GROUPS.map((g) => (
              <button key={g.key} onClick={() => setSelectedGroup(g.key)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap font-semibold flex items-center gap-1 ${selectedGroup === g.key ? 'bg-emerald-500 text-black' : 'bg-[#181b26] text-slate-400'}`}>
                {g.icon} {g.labelUz.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {filteredExercises.length === 0 ? (
            <div className="py-8 text-center text-slate-500 space-y-2">
              <p className="text-xs">Topilmadi</p>
              <button onClick={() => { setCustomName(search); setShowCreateModal(true); }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">
                <Plus size={13} /> Yangi mashq yaratish
              </button>
            </div>
          ) : (
            filteredExercises.map((ex) => (
              <div key={ex.id} className="p-2.5 rounded-lg bg-[#181b26] hover:bg-[#1f2330] border border-[#222636] flex items-center justify-between transition-colors group">
                <div className="flex-1 cursor-pointer pr-2" onClick={() => { onSelectExercise(ex); onClose(); }}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded bg-[#12141c] text-slate-500">{ex.muscleGroup}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{ex.nameUz}</h4>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => onOpenTechnique(ex)} className="p-1.5 rounded text-slate-600 hover:text-emerald-400"><Info size={14} /></button>
                  <button onClick={() => { onSelectExercise(ex); onClose(); }}
                    className="px-2 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-[10px] flex items-center gap-0.5 transition-colors">
                    <Plus size={12} /> Qo'shish
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-[#222636]">
          <button onClick={() => setShowCreateModal(true)} className="w-full py-2 rounded-lg border border-dashed border-[#222636] hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors">
            <Plus size={13} /> Yangi mashq yaratish
          </button>
        </div>

        {/* Create Custom Modal */}
        {showCreateModal && (
          <div className="absolute inset-0 bg-[#0d0e14]/95 z-20 flex flex-col p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#222636] mb-4">
              <h4 className="font-bold text-white text-sm">Yangi mashq</h4>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateCustom} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Mashq nomi</label>
                <input type="text" required placeholder="Masalan: Lunge bilan gantel" value={customName} onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#181b26] border border-[#222636] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Mushak guruhi</label>
                <select value={customGroup} onChange={(e) => setCustomGroup(e.target.value as MuscleGroup)}
                  className="w-full px-3 py-2 bg-[#181b26] border border-[#222636] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500">
                  {MUSCLE_GROUPS.map((g) => <option key={g.key} value={g.key}>{g.labelUz}</option>)}
                </select>
              </div>
              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="w-1/2 py-2 rounded-lg bg-[#181b26] text-slate-400 text-xs font-semibold">Bekor</button>
                <button type="submit" className="w-1/2 py-2 rounded-lg bg-emerald-500 text-black text-xs font-bold">Saqlash</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
