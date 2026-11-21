import React from 'react';
import { Cloud, X, Loader2 } from 'lucide-react';

interface CloudSyncBannerProps {
  onSignInGoogle: () => void;
  onDismiss: () => void;
  authLoading: boolean;
}

export const CloudSyncBanner: React.FC<CloudSyncBannerProps> = ({
  onSignInGoogle,
  onDismiss,
  authLoading,
}) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 mb-4 flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
          <Cloud size={16} />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-white leading-tight truncate">
            Tarix va kunlarni bulutda saqlang
          </h4>
          <p className="text-[10px] text-slate-400 leading-tight mt-0.5 truncate">
            Google orqali kiring — ma'lumotlar yo'qolmaydi
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          type="button"
          onClick={onSignInGoogle}
          disabled={authLoading}
          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-bold text-[11px] flex items-center gap-1 transition-colors"
        >
          {authLoading ? <Loader2 size={12} className="animate-spin" /> : null}
          <span>Kirish</span>
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="p-1.5 text-slate-500 hover:text-white rounded-lg transition-colors"
          title="Yopish"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
