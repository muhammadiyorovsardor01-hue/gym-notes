import React, { useState } from 'react';
import type { WorkoutSession, PersonalRecord, WeightUnit } from '../types';
import { Calendar, Clock, Flame, Trophy, Trash2, ChevronDown, ChevronUp, Cloud } from 'lucide-react';

interface HistoryViewProps {
  history: WorkoutSession[];
  personalRecords: Record<string, PersonalRecord>;
  onDeleteWorkout: (id: string) => void;
  weightUnit?: WeightUnit;
  isSignedIn?: boolean;
  onOpenAccount?: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  personalRecords,
  onDeleteWorkout,
  weightUnit = 'kg',
  isSignedIn = false,
  onOpenAccount,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'records'>('history');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const recordsList = Object.values(personalRecords);
  const totalWorkouts = history.length;
  const totalVolumeAllTime = history.reduce((sum, item) => sum + (item.totalVolume || 0), 0);

  return (
    <div className="space-y-4 pb-24">
      {/* Subtle cloud backup prompt if not signed in */}
      {!isSignedIn && onOpenAccount && (
        <button
          type="button"
          onClick={onOpenAccount}
          className="w-full bg-[#12141c] border border-[#222636] hover:border-emerald-500/40 px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-2 text-left transition-colors"
        >
          <span className="flex items-center gap-2 text-[11px] text-slate-300 truncate">
            <Cloud size={14} className="text-emerald-400 flex-shrink-0" />
            <span className="truncate">Tarixingiz faqat shu qurilmada saqlangan</span>
          </span>
          <span className="text-[11px] font-bold text-emerald-400 flex-shrink-0">
            Google bulutga ulash →
          </span>
        </button>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#12141c] border border-[#222636] p-3 rounded-xl text-center">
          <div className="text-[10px] text-slate-500 font-medium mb-1">Mashg'ulotlar</div>
          <div className="text-lg font-bold text-white font-mono-numbers">{totalWorkouts}</div>
        </div>
        <div className="bg-[#12141c] border border-[#222636] p-3 rounded-xl text-center">
          <div className="text-[10px] text-slate-500 font-medium mb-1">Jami tonnaj</div>
          <div className="text-lg font-bold text-amber-400 font-mono-numbers">
            {totalVolumeAllTime > 1000
              ? `${(totalVolumeAllTime / 1000).toFixed(1)}t`
              : `${totalVolumeAllTime}${weightUnit}`}
          </div>
        </div>
        <div className="bg-[#12141c] border border-[#222636] p-3 rounded-xl text-center">
          <div className="text-[10px] text-slate-500 font-medium mb-1">Rekordlar</div>
          <div className="text-lg font-bold text-emerald-400 font-mono-numbers">{recordsList.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#12141c] border border-[#222636] p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'history' ? 'bg-[#181b26] text-white' : 'text-slate-500'
          }`}
        >
          <Calendar size={13} /> Tarix
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'records' ? 'bg-emerald-500 text-black' : 'text-slate-500'
          }`}
        >
          <Trophy size={13} /> Rekordlar
        </button>
      </div>

      {activeTab === 'history' && (
        <div className="space-y-2">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-600 border border-dashed border-[#222636] rounded-xl">
              <Calendar size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs">Mashg'ulotlar tarixi bo'sh</p>
            </div>
          ) : (
            history.map((session) => {
              const isExpanded = expandedId === session.id;
              const dateStr = new Date(session.startTime).toLocaleDateString('uz-UZ', {
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
              });
              const durationMins = session.endTime ? Math.round((session.endTime - session.startTime) / 60000) : 0;

              return (
                <div key={session.id} className="bg-[#12141c] border border-[#222636] rounded-xl p-4">
                  <div onClick={() => setExpandedId(prev => prev === session.id ? null : session.id)} className="cursor-pointer flex items-start justify-between">
                    <div>
                      <div className="text-[10px] text-emerald-400 font-medium mb-0.5">{dateStr}</div>
                      <h3 className="text-sm font-bold text-white">{session.title}</h3>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1 font-mono-numbers">
                        {durationMins > 0 && <span className="flex items-center gap-1"><Clock size={11} /> {durationMins} daq</span>}
                        <span className="text-amber-400 font-semibold flex items-center gap-1"><Flame size={11} /> {session.totalVolume.toLocaleString()} {weightUnit}</span>
                        <span>{session.exercises.length} mashq</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={(e) => { e.stopPropagation(); if(confirm("O'chirilsinmi?")) onDeleteWorkout(session.id); }} className="p-1.5 text-slate-600 hover:text-red-400"><Trash2 size={14} /></button>
                      <button className="p-1.5 text-slate-500">{isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-[#222636] space-y-2">
                      {session.exercises.map((we, idx) => (
                        <div key={idx} className="bg-[#0d0e14] p-2.5 rounded-lg border border-[#1a1d2a]">
                          <div className="text-[11px] font-bold text-white mb-1.5">{we.exercise.nameUz}</div>
                          <div className="flex flex-wrap gap-1">
                            {we.sets.map((set, sIdx) => (
                              <span key={sIdx} className={`text-[10px] font-mono-numbers px-1.5 py-0.5 rounded border ${
                                set.completed ? 'bg-[#181b26] border-[#222636] text-slate-300' : 'border-[#1a1d2a] text-slate-600 line-through'
                              }`}>
                                {set.weight}{weightUnit} × {set.reps}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'records' && (
        <div className="space-y-2">
          {recordsList.length === 0 ? (
            <div className="py-12 text-center text-slate-600 border border-dashed border-[#222636] rounded-xl">
              <Trophy size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs">Rekordlar qayd etilmagan</p>
            </div>
          ) : (
            recordsList.map((pr) => (
              <div key={pr.exerciseId} className="bg-[#12141c] border border-[#222636] p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{pr.exerciseName}</h4>
                    <p className="text-[10px] text-slate-500">{pr.date}</p>
                  </div>
                </div>
                <div className="text-right font-mono-numbers">
                  <div className="text-sm font-black text-amber-400">{pr.maxWeight} {weightUnit}</div>
                  <div className="text-[10px] text-slate-500">{pr.maxRepsAtMaxWeight} reps</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
