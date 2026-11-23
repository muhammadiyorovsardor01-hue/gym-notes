import { useState } from 'react';
import type { ExerciseItem } from '../types';
import { getExerciseShortsUrl, getExerciseFullVideoUrl, getExerciseThumbnailUrl } from '../utils/youtube';
import { X, ExternalLink, Play, CheckCircle2, AlertTriangle, Zap, Film } from 'lucide-react';

interface TechniqueModalProps {
  exercise: ExerciseItem | null;
  onClose: () => void;
}

export const TechniqueModal: React.FC<TechniqueModalProps> = ({ exercise, onClose }) => {
  const [failedThumbId, setFailedThumbId] = useState<string | null>(null);

  if (!exercise) return null;

  const shortsUrl = getExerciseShortsUrl(exercise);
  const fullVideoUrl = getExerciseFullVideoUrl(exercise);
  const thumbnailUrl = getExerciseThumbnailUrl(exercise);
  const showThumbnail = Boolean(thumbnailUrl && failedThumbId !== exercise.id);

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
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                <Zap size={11} className="fill-red-400" /> YouTube Shorts
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
          
          {/* Main YouTube Shorts Card (Fast 30-second form check) */}
          <div className="space-y-2">
            <a
              href={shortsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden border border-[#222636] hover:border-red-500/50 bg-[#0d0e14] transition-all group relative"
            >
              {/* Thumbnail with Shorts Badge */}
              <div className="relative aspect-video w-full bg-[#0d0e14]">
                {showThumbnail ? (
                  <>
                    <img
                      src={thumbnailUrl || ''}
                      alt={exercise.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                      decoding="async"
                      onError={() => setFailedThumbId(exercise.id)}
                    />
                    {/* Dark gradient & Play Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 group-hover:scale-110 flex items-center justify-center shadow-xl shadow-red-900/40 transition-all">
                        <Play size={22} className="ml-1 fill-white text-white" />
                      </div>
                      <span className="mt-2 text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                        <Zap size={12} className="fill-red-500 text-red-500" /> 30-soniyalik Shorts
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center mx-auto">
                        <Play size={20} className="fill-red-400 ml-0.5" />
                      </div>
                      <p className="text-xs text-slate-500">Shorts videoni ko'rish</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Action Bar */}
              <div className="px-4 py-3 flex items-center justify-between bg-[#12141c]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0">
                    <Zap size={15} className="fill-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                      Jeff Nippard Shorts
                    </p>
                    <p className="text-[10px] text-slate-400">Tezkor to'g'ri texnika (30-60 sek)</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-red-400 font-bold px-2.5 py-1.5 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                  Shorts ochish <ExternalLink size={12} />
                </div>
              </div>
            </a>

            {/* Optional Full Video Link if user wants long tutorial */}
            <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
              <span>Zalda vaqt ketkazmaslik uchun qisqa Shorts ochiladi.</span>
              <a
                href={fullVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white flex items-center gap-1 underline underline-offset-2 transition-colors"
              >
                <Film size={11} /> To'liq video (Uzun darslik)
              </a>
            </div>
          </div>

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
                <AlertTriangle size={14} /> Saqlaning (Xatolar)
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
