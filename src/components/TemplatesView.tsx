import React, { useState } from 'react';
import type { WorkoutTemplate, ExerciseItem } from '../types';
import { 
  Play, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Trash2, 
  Minus, 
  RotateCcw,
  Sparkles,
  X
} from 'lucide-react';

interface TemplatesViewProps {
  templates: WorkoutTemplate[];
  exercises: ExerciseItem[];
  onStartTemplate: (template: WorkoutTemplate) => void;
  onOpenTechnique: (exercise: ExerciseItem) => void;
  onUpdateTemplates: (updated: WorkoutTemplate[]) => void;
  onResetTemplates: () => void;
  onOpenAddExerciseToDay: (templateId: string) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  exercises,
  onStartTemplate,
  onOpenTechnique,
  onUpdateTemplates,
  onResetTemplates,
  onOpenAddExerciseToDay,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>('day-1-full-body');
  const [showNewDayModal, setShowNewDayModal] = useState(false);
  const [newDayTitle, setNewDayTitle] = useState('');
  const [newDayBadge, setNewDayBadge] = useState('');

  const exerciseMap = new Map<string, ExerciseItem>();
  exercises.forEach(ex => exerciseMap.set(ex.id, ex));

  // Remove an exercise from a specific Day
  const handleRemoveExerciseFromDay = (templateId: string, exIndex: number) => {
    const updated = templates.map(t => {
      if (t.id === templateId) {
        const newExercises = [...t.exercises];
        newExercises.splice(exIndex, 1);
        return { ...t, exercises: newExercises };
      }
      return t;
    });
    onUpdateTemplates(updated);
  };

  // Adjust sets count for an exercise in a Day
  const handleAdjustSets = (templateId: string, exIndex: number, delta: number) => {
    const updated = templates.map(t => {
      if (t.id === templateId) {
        const newExercises = [...t.exercises];
        const cur = newExercises[exIndex].setsCount;
        newExercises[exIndex] = {
          ...newExercises[exIndex],
          setsCount: Math.max(1, cur + delta),
        };
        return { ...t, exercises: newExercises };
      }
      return t;
    });
    onUpdateTemplates(updated);
  };

  // Update target reps string
  const handleUpdateReps = (templateId: string, exIndex: number, repsStr: string) => {
    const updated = templates.map(t => {
      if (t.id === templateId) {
        const newExercises = [...t.exercises];
        newExercises[exIndex] = {
          ...newExercises[exIndex],
          targetReps: repsStr,
        };
        return { ...t, exercises: newExercises };
      }
      return t;
    });
    onUpdateTemplates(updated);
  };

  // Delete an entire Day / Routine
  const handleDeleteDay = (templateId: string) => {
    if (confirm("Ushbu kunlik dasturni butunlay o'chirmoqchimisiz?")) {
      const updated = templates.filter(t => t.id !== templateId);
      onUpdateTemplates(updated);
    }
  };

  // Create a brand new Day (e.g. Day 4)
  const handleCreateNewDay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDayTitle.trim()) return;

    const newTemplate: WorkoutTemplate = {
      id: `custom-day-${Date.now()}`,
      name: newDayTitle.trim(),
      description: "Maxsus tuzilgan mashg'ulot dasturi",
      dayBadge: newDayBadge.trim() || `${templates.length + 1}-kun`,
      exercises: [],
      isCustom: true,
    };

    const updated = [...templates, newTemplate];
    onUpdateTemplates(updated);
    setExpandedId(newTemplate.id);
    setNewDayTitle('');
    setNewDayBadge('');
    setShowNewDayModal(false);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Informative storage guarantee banner */}
      <div className="bg-[#12141c] border border-emerald-500/20 rounded-xl p-3.5 flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 flex-shrink-0">
          <ShieldCheck size={18} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white">
            Avtomatik saqlanish kafolati
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
            O'zingiz xohlagan mashqlarni Day 1, Day 2 ga qo'shib olishingiz mumkin. Sahifani yangilasangiz ham <strong className="text-emerald-400">hech qachon o'chib ketmaydi</strong> — barchasi telefoningizda avtomatik saqlanadi.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-bold text-white">Mashg'ulot kunlari</h2>
          <p className="text-xs text-slate-500">O'zingizga moslab mashq qo'shing yoki o'chiring</p>
        </div>
        <button
          onClick={() => setShowNewDayModal(true)}
          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
        >
          <Plus size={14} /> Yangi kun
        </button>
      </div>

      {/* Templates List */}
      <div className="space-y-3">
        {templates.map((template) => {
          const isExpanded = expandedId === template.id;

          return (
            <div
              key={template.id}
              className="bg-[#12141c] border border-[#222636] hover:border-[#2f354a] rounded-xl overflow-hidden transition-all"
            >
              {/* Template Top Header */}
              <div 
                className="p-4 cursor-pointer flex items-center justify-between"
                onClick={() => setExpandedId(prev => prev === template.id ? null : template.id)}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 uppercase tracking-wide">
                      {template.dayBadge}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono-numbers">
                      {template.exercises.length} ta mashq
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{template.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{template.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartTemplate(template);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Play size={13} className="fill-black" /> Boshlash
                  </button>
                  <button className="p-1.5 text-slate-500">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded Exercises Breakdown & Editor */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#1a1d2a] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    <span>Rejadagi mashqlar ({template.exercises.length}):</span>
                    <span>Tahrirlash / Setlar</span>
                  </div>

                  {template.exercises.length === 0 ? (
                    <div className="py-6 text-center text-slate-500 border border-dashed border-[#222636] rounded-lg">
                      <p className="text-xs mb-2">Bu kunda hali mashqlar yo'q</p>
                      <button
                        onClick={() => onOpenAddExerciseToDay(template.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold text-xs inline-flex items-center gap-1"
                      >
                        <Plus size={13} /> Mashq tanlab qo'shish
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {template.exercises.map((item, idx) => {
                        const ex = exerciseMap.get(item.exerciseId);
                        const name = ex ? ex.nameUz : item.exerciseId;

                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d0e14] border border-[#1a1d2a] text-xs hover:border-[#262a3a] transition-colors"
                          >
                            <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                              <span className="w-5 h-5 rounded-full bg-[#181b26] text-slate-400 text-[10px] font-mono-numbers font-bold flex items-center justify-center flex-shrink-0">
                                {idx + 1}
                              </span>
                              <div className="truncate">
                                <span 
                                  className="font-semibold text-white hover:text-emerald-400 cursor-pointer transition-colors block truncate"
                                  onClick={() => ex && onOpenTechnique(ex)}
                                >
                                  {name}
                                </span>
                                {ex && (
                                  <span className="text-[10px] text-slate-500 block">
                                    {ex.muscleGroup}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Stepper for Sets & Reps Editor */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {/* Sets stepper */}
                              <div className="flex items-center bg-[#181b26] rounded-md border border-[#222636] p-0.5">
                                <button
                                  onClick={() => handleAdjustSets(template.id, idx, -1)}
                                  className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                                  title="Set kamaytirish"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="px-1.5 text-[11px] font-bold text-white font-mono-numbers">
                                  {item.setsCount}s
                                </span>
                                <button
                                  onClick={() => handleAdjustSets(template.id, idx, 1)}
                                  className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                                  title="Set qo'shish"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>

                              {/* Target Reps input */}
                              <input
                                type="text"
                                value={item.targetReps}
                                onChange={(e) => handleUpdateReps(template.id, idx, e.target.value)}
                                className="w-14 py-1 text-center font-mono-numbers font-semibold bg-[#181b26] border border-[#222636] rounded-md text-emerald-400 text-[11px] focus:outline-none focus:border-emerald-500"
                                title="Takrorlar soni"
                              />

                              {/* Remove exercise from Day */}
                              <button
                                onClick={() => handleRemoveExerciseFromDay(template.id, idx)}
                                className="p-1 rounded text-slate-600 hover:text-red-400 transition-colors"
                                title="Bu mashqni olib tashlash"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Actions for this day */}
                  <div className="pt-2 flex items-center gap-2">
                    {/* Add Exercise to this Day Button */}
                    <button
                      onClick={() => onOpenAddExerciseToDay(template.id)}
                      className="flex-1 py-2 rounded-lg bg-[#181b26] hover:bg-[#1f2330] border border-[#222636] hover:border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus size={14} /> + Ushbu kunga mashq qo'shish
                    </button>

                    {/* Delete this Day (if customized) */}
                    <button
                      onClick={() => handleDeleteDay(template.id)}
                      className="p-2 rounded-lg bg-[#181b26] hover:bg-red-500/10 text-slate-500 hover:text-red-400 border border-[#222636] transition-colors"
                      title="Kunni o'chirish"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Big Start Button */}
                  <button
                    onClick={() => onStartTemplate(template)}
                    className="w-full mt-2 py-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-500/30"
                  >
                    <Play size={14} className="fill-current" /> {template.name} mashg'ulotini boshlash
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom helper actions */}
      <div className="pt-3 flex items-center justify-between text-xs px-1">
        <button
          onClick={onResetTemplates}
          className="text-slate-600 hover:text-slate-400 flex items-center gap-1 text-[11px] transition-colors"
        >
          <RotateCcw size={12} /> Boshlang'ich holatga qaytarish
        </button>
        <button
          onClick={() => setShowNewDayModal(true)}
          className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-[11px]"
        >
          <Plus size={13} /> Yangi kun (Day 4...) qo'shish
        </button>
      </div>

      {/* Modal to create a new Day */}
      {showNewDayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="bg-[#12141c] border border-[#222636] rounded-2xl p-5 max-w-sm w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#222636]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-400" /> Yangi mashg'ulot kuni yaratish
              </h3>
              <button onClick={() => setShowNewDayModal(false)} className="text-slate-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateNewDay} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Kun nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Day 4 — Kardio & Press"
                  value={newDayTitle}
                  onChange={(e) => setNewDayTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#181b26] border border-[#222636] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Belgi (Badge)
                </label>
                <input
                  type="text"
                  placeholder="Masalan: 4-kun yoki Kardio"
                  value={newDayBadge}
                  onChange={(e) => setNewDayBadge(e.target.value)}
                  className="w-full px-3 py-2 bg-[#181b26] border border-[#222636] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewDayModal(false)}
                  className="w-1/2 py-2 rounded-lg bg-[#181b26] text-slate-400 text-xs font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-lg bg-emerald-500 text-black text-xs font-bold"
                >
                  Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
