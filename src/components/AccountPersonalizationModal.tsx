import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import type { SyncStatus, UserPreferences, WeightUnit } from '../types';
import { THEMES } from '../data/themes';
import {
  X,
  Check,
  Cloud,
  RefreshCw,
  LogOut,
  AlertCircle,
  Volume2,
  VolumeX,
  Loader2,
} from 'lucide-react';

interface AccountPersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  authLoading: boolean;
  authError: string | null;
  syncStatus: SyncStatus;
  lastSyncedAt: number | null;
  onSignInGoogle: () => void;
  onSignOut: () => void;
  onManualSync: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (updated: UserPreferences) => void;
}

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="flex-shrink-0">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
    />
  </svg>
);

export const AccountPersonalizationModal: React.FC<AccountPersonalizationModalProps> = ({
  isOpen,
  onClose,
  user,
  authLoading,
  authError,
  syncStatus,
  lastSyncedAt,
  onSignInGoogle,
  onSignOut,
  onManualSync,
  preferences,
  onUpdatePreferences,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [user?.photoURL]);

  if (!isOpen) return null;

  const syncedTimeLabel = lastSyncedAt
    ? new Date(lastSyncedAt).toLocaleTimeString('uz-UZ', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const userInitial = (user?.displayName || user?.email || 'G')[0]?.toUpperCase() || 'G';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-white leading-tight">
              Profil va Sozlamalar
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Google bulut & shaxsiy ko'rinish
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Yopish"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto space-y-5 flex-1">
          {/* 1. Google Account & Cloud Sync Card */}
          <div className="bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3">
            {!user ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Cloud size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Bulutli sinxronizatsiya</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                      Google bilan kiring — Kunlar, Tarix, PR rekordlar va tanlangan mavzu barcha qurilmalarda avtomatik saqlanadi.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onSignInGoogle}
                  disabled={authLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-100 disabled:opacity-60 text-neutral-900 font-bold text-xs flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-[0.99]"
                >
                  {authLoading ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-neutral-700" />
                      <span>Kirilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <GoogleIcon />
                      <span>Google bilan kirish</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {user.photoURL && !imgFailed ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Profil'}
                        referrerPolicy="no-referrer"
                        onError={() => setImgFailed(true)}
                        className="w-10 h-10 rounded-full object-cover border border-[var(--border-subtle)] flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-black font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {userInitial}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {user.displayName || 'Foydalanuvchi'}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Sync Badge */}
                  <div className="flex-shrink-0">
                    {syncStatus === 'syncing' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg bg-amber-500/15 text-amber-400">
                        <RefreshCw size={10} className="animate-spin" /> Saqlanmoqda
                      </span>
                    )}
                    {syncStatus === 'synced' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-400">
                        <Check size={10} strokeWidth={3} />
                        {syncedTimeLabel ? syncedTimeLabel : 'Sinxronlandi'}
                      </span>
                    )}
                    {syncStatus === 'error' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg bg-red-500/15 text-red-400">
                        <AlertCircle size={10} /> Xatolik
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onManualSync}
                    disabled={syncStatus === 'syncing'}
                    className="py-2 px-3 rounded-xl bg-[var(--bg-surface)] hover:bg-white/10 border border-[var(--border-subtle)] text-slate-200 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors disabled:opacity-60"
                  >
                    <RefreshCw
                      size={12}
                      className={syncStatus === 'syncing' ? 'animate-spin' : ''}
                    />
                    Hozir sinxronlash
                  </button>
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="py-2 px-3 rounded-xl bg-[var(--bg-surface)] hover:bg-red-500/15 border border-[var(--border-subtle)] hover:border-red-500/30 text-slate-300 hover:text-red-400 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogOut size={12} /> Chiqish
                  </button>
                </div>
              </>
            )}

            {authError && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-[11px] flex items-start gap-2 leading-snug">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-red-400" />
                <span>{authError}</span>
              </div>
            )}
          </div>

          {/* 2. Theme Palette Picker (matching screenshot style) */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-0.5">
              KO'RINISH (MAVZU)
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {THEMES.map((theme) => {
                const isSelected = preferences.theme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() =>
                      onUpdatePreferences({ ...preferences, theme: theme.id })
                    }
                    style={{
                      borderColor: isSelected ? theme.accentHex : 'transparent',
                    }}
                    className={`rounded-2xl p-1.5 border-2 transition-all flex flex-col items-center ${
                      isSelected ? 'bg-white/[0.06]' : 'bg-white/[0.03] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="w-full rounded-xl p-1.5 bg-[#0a0912] space-y-1">
                      <div className="grid grid-cols-2 gap-1">
                        <div
                          className="h-6 rounded-md"
                          style={{ backgroundColor: theme.swatches.topLeft }}
                        />
                        <div
                          className="h-6 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: theme.swatches.topRight }}
                        >
                          {isSelected && (
                            <Check size={12} strokeWidth={3} className="text-black" />
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div
                          className="h-4 rounded-md"
                          style={{ backgroundColor: theme.swatches.bottom[0] }}
                        />
                        <div
                          className="h-4 rounded-md"
                          style={{ backgroundColor: theme.swatches.bottom[1] }}
                        />
                        <div
                          className="h-4 rounded-md"
                          style={{ backgroundColor: theme.swatches.bottom[2] }}
                        />
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-1.5 ${
                        isSelected ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {theme.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Personalization Controls */}
          <div className="space-y-3 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-2xl p-4">
            {/* Weight Unit */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-white">Vazn birligi</div>
                <div className="text-[10px] text-slate-500">Toshlar o'lchovi</div>
              </div>
              <div className="grid grid-cols-2 gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)]">
                {(['kg', 'lbs'] as WeightUnit[]).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() =>
                      onUpdatePreferences({ ...preferences, weightUnit: unit })
                    }
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors uppercase ${
                      preferences.weightUnit === unit
                        ? 'bg-emerald-500 text-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* Weight Step */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-white">Tosh qadami (+ / -)</div>
                <div className="text-[10px] text-slate-500">Har bosishda o'zgarish</div>
              </div>
              <div className="grid grid-cols-3 gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)]">
                {[1, 2.5, 5].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() =>
                      onUpdatePreferences({ ...preferences, weightStep: step })
                    }
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono-numbers transition-colors ${
                      preferences.weightStep === step
                        ? 'bg-emerald-500 text-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* Timer Sound & Vibration */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[var(--bg-surface)] text-slate-300">
                  {preferences.soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Taymer ovozi va tebranishi</div>
                  <div className="text-[10px] text-slate-500">Dam tugaganda signal</div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.soundEnabled}
                onClick={() =>
                  onUpdatePreferences({
                    ...preferences,
                    soundEnabled: !preferences.soundEnabled,
                  })
                }
                className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                  preferences.soundEnabled
                    ? 'bg-emerald-500 justify-end'
                    : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] justify-start'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full transition-transform ${
                    preferences.soundEnabled ? 'bg-black' : 'bg-slate-400'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
