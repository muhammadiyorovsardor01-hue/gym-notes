import type { ExerciseItem } from '../types';
import { X, ExternalLink, Play, CheckCircle2, AlertTriangle } from 'lucide-react';

interface TechniqueModalProps {
  exercise: ExerciseItem | null;
  onClose: () => void;
}

export const TechniqueModal: React.FC<TechniqueModalProps> = ({ exercise, onClose }) => {
  if (!exercise) return null;

  const jeffSearchQuery = exercise.youtubeQuery 
    ? exercise.youtubeQuery 
    : `Jeff Nippard ${exercise.name} technique`;

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(jeffSearchQuery)}`;
  const youtubeVideoUrl = exercise.youtubeId 
    ? `https://www.youtube.com/watch?v=${exercise.youtubeId}` 
    : youtubeSearchUrl;
  const thumbnailUrl = exercise.youtubeId 
    ? `https://img.youtube.com/vi/${exercise.youtubeId}/mqdefault.jpg`
    : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#12141c] border border-[#222636] rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-[#222636] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 uppercase tracking-wider">
                {exercise.muscleGroup}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">
              {exercise.nameUz}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {exercise.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5 overflow-y-auto space-y-6 text-sm flex-1">
          
          {/* YouTube Video — Thumbnail + Direct Link (no iframe embed!) */}
          <a
            href={youtubeVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden border border-[#222636] hover:border-[#32374d] bg-[#0d0e14] transition-all group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full bg-[#0d0e14]">
              {thumbnailUrl ? (
                <>
                  <img
                    src={thumbnailUrl}
                    alt={exercise.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 group-hover:scale-110 flex items-center justify-center shadow-xl shadow-red-900/40 transition-all">
                      <Play size={22} className="ml-1 fill-white text-white" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center mx-auto">
                      <Play size={20} className="fill-red-400 ml-0.5" />
                    </div>
                    <p className="text-xs text-slate-500">YouTube'da videoni ko'rish</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video info bar */}
            <div className="px-4 py-3 flex items-center justify-between bg-[#12141c]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0">
                  <Play size={12} className="fill-white ml-0.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">Jeff Nippard</p>
                  <p className="text-[10px] text-slate-500">Science-Based • YouTube</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-red-400 font-medium">
                YouTube'da ochish <ExternalLink size={11} />
              </div>
            </div>
          </a>

          {/* Technique Cues */}
          {exercise.cues && exercise.cues.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-emerald-400 text-[11px] uppercase tracking-wider mb-3">
                <CheckCircle2 size={14} /> To'g'ri texnika
              </h4>
              <div className="space-y-2">
                {exercise.cues.map((cue, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-300 bg-[#181b26] p-3 rounded-xl border border-[#222636]">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed text-[13px]">{cue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {exercise.mistakes && exercise.mistakes.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-amber-400 text-[11px] uppercase tracking-wider mb-3">
                <AlertTriangle size={14} /> Xatolar
              </h4>
              <div className="space-y-2">
                {exercise.mistakes.map((mistake, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-300 bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl">
                    <span className="flex-shrink-0 text-amber-400 font-bold text-[13px] mt-0.5">✕</span>
                    <span className="leading-relaxed text-[13px]">{mistake}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#222636]">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#181b26] hover:bg-[#1f2330] text-white font-semibold text-sm transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
