import React, { useState } from 'react';
import type { WorkoutTemplate, ExerciseItem } from '../types';
import { Play, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface TemplatesViewProps {
  templates: WorkoutTemplate[];
  exercises: ExerciseItem[];
  onStartTemplate: (template: WorkoutTemplate) => void;
  onOpenTechnique: (exercise: ExerciseItem) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  exercises,
  onStartTemplate,
  onOpenTechnique,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>('day-1-full-body');

  const exerciseMap = new Map<string, ExerciseItem>();
  exercises.forEach(ex => exerciseMap.set(ex.id, ex));

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
            Sahifani yangilasangiz yoki brauzerni butunlay yopsangiz ham, tanlangan mashqlar va kiritgan toshlaringiz <strong className="text-emerald-400">hech qachon o‘chib ketmaydi</strong> — barchasi telefoningiz xotirasida doimiy saqlanadi.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-bold text-white">Kunlik dasturlar</h2>
          <p className="text-xs text-slate-500">Day 1, Day 2, Day 3 Full Body mashg'ulotlari</p>
        </div>
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

              {/* Expanded Exercises Breakdown */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#1a1d2a] space-y-2">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Dasturdagi mashqlar va reja:
                  </div>

                  <div className="space-y-1.5">
                    {template.exercises.map((item, idx) => {
                      const ex = exerciseMap.get(item.exerciseId);
                      const name = ex ? ex.nameUz : item.exerciseId;

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d0e14] border border-[#1a1d2a] text-xs hover:border-[#262a3a] transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#181b26] text-slate-400 text-[10px] font-mono-numbers font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div>
                              <span 
                                className="font-semibold text-white hover:text-emerald-400 cursor-pointer transition-colors"
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

                          <div className="flex items-center gap-3 font-mono-numbers text-[11px]">
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                              {item.setsCount} set × {item.targetReps}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Big Start Button */}
                  <button
                    onClick={() => onStartTemplate(template)}
                    className="w-full mt-3 py-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-500/30"
                  >
                    <Play size={14} className="fill-current" /> {template.name} mashg'ulotini boshlash
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
