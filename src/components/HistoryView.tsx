import React, { useState } from 'react';
import type { WorkoutSession, PersonalRecord } from '../types';
import { 
  Calendar, 
  Clock, 
  Flame, 
  Dumbbell, 
  Trophy, 
  Trash2, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

interface HistoryViewProps {
  history: WorkoutSession[];
  personalRecords: Record<string, PersonalRecord>;
  onDeleteWorkout: (id: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  personalRecords,
  onDeleteWorkout,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'records'>('history');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const recordsList = Object.values(personalRecords);

  // Overall statistics
  const totalWorkouts = history.length;
  const totalVolumeAllTime = history.reduce((sum, item) => sum + (item.totalVolume || 0), 0);

  return (
    <div className="space-y-6 pb-28">
      {/* Overview Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl text-center">
          <div className="text-[11px] text-neutral-400 font-medium mb-1">Mashg'ulotlar</div>
          <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
            {totalWorkouts}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl text-center">
          <div className="text-[11px] text-neutral-400 font-medium mb-1">Jami Tonnaj</div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono truncate">
            {totalVolumeAllTime > 1000 
              ? `${(totalVolumeAllTime / 1000).toFixed(1)} t` 
              : `${totalVolumeAllTime} kg`}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl text-center">
          <div className="text-[11px] text-neutral-400 font-medium mb-1">Rekordlar</div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">
            {recordsList.length}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-neutral-900 border border-neutral-800 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'history'
              ? 'bg-neutral-800 text-white shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Calendar size={15} /> Mashg'ulotlar tarixi ({history.length})
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'records'
              ? 'bg-emerald-500 text-black shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Trophy size={15} /> Rekordlar (PRs)
        </button>
      </div>

      {/* TAB 1: History Log */}
      {activeTab === 'history' && (
        <div className="space-y-3.5">
          {history.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 space-y-2 border border-dashed border-neutral-800 rounded-2xl">
              <Calendar size={32} className="mx-auto opacity-50" />
              <p className="text-sm">Hozircha saqlangan mashg'ulotlar yo'q.</p>
              <p className="text-xs">Birinchi mashg'ulotni boshlang va yutuqlaringizni ko'ring!</p>
            </div>
          ) : (
            history.map((session) => {
              const isExpanded = expandedId === session.id;
              const dateStr = new Date(session.startTime).toLocaleDateString('uz-UZ', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              const durationMins = session.endTime 
                ? Math.round((session.endTime - session.startTime) / 60000) 
                : 0;

              return (
                <div
                  key={session.id}
                  className="bg-neutral-900 border border-neutral-800/90 rounded-2xl p-4 sm:p-5 shadow-lg transition-all"
                >
                  <div 
                    onClick={() => toggleExpand(session.id)}
                    className="cursor-pointer flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="text-[11px] text-emerald-400 font-semibold mb-0.5">
                        {dateStr}
                      </div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {session.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-2">
                        {durationMins > 0 && (
                          <span className="flex items-center gap-1">
                            <Clock size={13} /> {durationMins} daq
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-amber-400 font-medium">
                          <Flame size={13} /> {session.totalVolume.toLocaleString()} kg
                        </span>
                        <span className="flex items-center gap-1">
                          <Dumbbell size={13} /> {session.exercises.length} mashq
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Bu mashg'ulotni o'chirib tashlamoqchimisiz?")) {
                            onDeleteWorkout(session.id);
                          }
                        }}
                        className="p-2 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-800/60">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-neutral-800 space-y-3 animate-in fade-in duration-200">
                      {session.exercises.map((we, idx) => (
                        <div key={idx} className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/60">
                          <div className="text-xs font-bold text-white mb-2 flex items-center justify-between">
                            <span>{we.exercise.nameUz}</span>
                            <span className="text-neutral-500 text-[11px] font-normal">
                              {we.sets.filter(s => s.completed).length} set bajarildi
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {we.sets.map((set, sIdx) => (
                              <div
                                key={sIdx}
                                className={`text-[11px] font-mono px-2 py-1 rounded-lg border ${
                                  set.completed
                                    ? 'bg-neutral-800 border-neutral-700 text-neutral-200'
                                    : 'bg-neutral-900 border-neutral-800 text-neutral-500 line-through'
                                }`}
                              >
                                {set.weight} kg × {set.reps}
                              </div>
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

      {/* TAB 2: Personal Records (PRs) */}
      {activeTab === 'records' && (
        <div className="space-y-3">
          {recordsList.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 space-y-2 border border-dashed border-neutral-800 rounded-2xl">
              <Trophy size={32} className="mx-auto opacity-50" />
              <p className="text-sm">Hozircha shaxsiy rekordlar qayd etilmagan.</p>
              <p className="text-xs">Mashg'ulotlarda ko'targan eng og'ir toshlaringiz bu yerda chiqadi!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recordsList.map((pr) => (
                <div
                  key={pr.exerciseId}
                  className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{pr.exerciseName}</h4>
                      <p className="text-[11px] text-neutral-500">{pr.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-amber-400 font-mono">
                      {pr.maxWeight} kg
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {pr.maxRepsAtMaxWeight} takror
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
