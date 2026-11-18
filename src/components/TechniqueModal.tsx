import { useState } from 'react';
import type { ExerciseItem } from '../types';
import { X, ExternalLink, Play, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface TechniqueModalProps {
  exercise: ExerciseItem | null;
  onClose: () => void;
}

export const TechniqueModal: React.FC<TechniqueModalProps> = ({ exercise, onClose }) => {
  const [showEmbed, setShowEmbed] = useState(false);

  if (!exercise) return null;

  const jeffSearchQuery = exercise.youtubeQuery 
    ? exercise.youtubeQuery 
    : `Jeff Nippard ${exercise.name} technique`;

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(jeffSearchQuery)}`;
  const embedUrl = exercise.youtubeId ? `https://www.youtube-nocookie.com/embed/${exercise.youtubeId}?autoplay=1&rel=0` : null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-start justify-between bg-neutral-900/90 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                {exercise.muscleGroup}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                <Sparkles size={11} /> Jeff Nippard Guide
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {exercise.nameUz}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {exercise.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800/60 hover:bg-neutral-800 transition-colors"
            title="Yopish"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-sm">
          {/* YouTube Video Section */}
          <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/70 p-3 sm:p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center text-white font-bold text-[10px]">
                  <Play size={12} className="fill-white ml-0.5" />
                </div>
                <div>
                  <span className="font-semibold text-white text-xs sm:text-sm block leading-none">
                    Jeff Nippard Video Qo'llanmasi
                  </span>
                  <span className="text-[10px] text-neutral-400">@jeffnippard (Science-Based)</span>
                </div>
              </div>
              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all"
              >
                YouTube'da ko'rish <ExternalLink size={12} />
              </a>
            </div>

            {/* Video Player or Embed launcher */}
            {exercise.youtubeId ? (
              showEmbed ? (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
                  <iframe
                    src={embedUrl || ''}
                    title={exercise.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowEmbed(true)}
                  className="w-full aspect-video rounded-xl bg-neutral-800/80 hover:bg-neutral-800 flex flex-col items-center justify-center gap-2 text-neutral-300 hover:text-white transition-all group border border-neutral-700/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="w-14 h-14 rounded-full bg-red-600/90 group-hover:bg-red-500 group-hover:scale-110 flex items-center justify-center text-white shadow-xl shadow-red-600/40 transition-all z-10">
                    <Play size={22} className="ml-1 fill-white" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-200 z-10">
                    Ilova ichida videoni tomosha qilish
                  </span>
                </button>
              )
            ) : (
              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-6 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 flex flex-col items-center justify-center gap-2 text-neutral-300 hover:text-white transition-all border border-dashed border-neutral-700"
              >
                <div className="w-10 h-10 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center">
                  <Play size={18} className="fill-red-400 ml-0.5" />
                </div>
                <span className="text-xs font-medium text-neutral-300">
                  Jeff Nippard'ning ushbu mashq bo'yicha videosini YouTube'da ochish
                </span>
              </a>
            )}
          </div>

          {/* Technique Cues */}
          {exercise.cues && exercise.cues.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-emerald-400 text-xs uppercase tracking-wider mb-2.5">
                <CheckCircle2 size={16} /> Jeff Nippard tavsiya etgan to'g'ri texnika
              </h4>
              <ul className="space-y-2">
                {exercise.cues.map((cue, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-neutral-200 bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-800/60">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{cue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Common Mistakes */}
          {exercise.mistakes && exercise.mistakes.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-amber-400 text-xs uppercase tracking-wider mb-2.5">
                <AlertTriangle size={16} /> Ko'p qilinadigan xatolar (Saqlaning!)
              </h4>
              <ul className="space-y-2">
                {exercise.mistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-neutral-300 bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-xl">
                    <span className="flex-shrink-0 text-amber-400 text-base leading-none mt-0.5">•</span>
                    <span className="leading-snug">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/90 flex gap-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm transition-colors"
          >
            Tushundim
          </button>
        </div>
      </div>
    </div>
  );
};
