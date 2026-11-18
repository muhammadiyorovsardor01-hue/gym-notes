import { useState, useEffect } from 'react';
import { Smartphone, Download, X, Share2, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallShortcutBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as unknown as { standalone?: boolean }).standalone) {
      setIsStandalone(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (isStandalone || dismissed) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Show manual instructions for iOS or other browsers
      setShowIosInstructions(true);
    }
  };

  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-neutral-900 border border-emerald-500/30 rounded-2xl p-3.5 mb-5 flex items-center justify-between gap-3 shadow-lg shadow-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Smartphone size={20} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
              Telefon ekraniga shortcut qo'shish
            </h4>
            <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">
              Zalda ilova kabi darhol ochilishi uchun ekraningizga o'rnating
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
          >
            <Download size={14} /> O'rnatish
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-neutral-500 hover:text-white rounded-lg transition-colors"
            title="Yopish"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Manual Instructions Modal (For iOS / browsers without prompt) */}
      {showIosInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <PlusSquare size={28} />
            </div>

            <h3 className="text-lg font-bold text-white">
              Bosh ekranga qanday qo'shiladi?
            </h3>

            <div className="text-left text-xs text-neutral-300 space-y-2.5 bg-neutral-950/60 p-3.5 rounded-2xl border border-neutral-800">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                  1
                </span>
                <span>Brauzeringizning pastki yoki yuqori menyusini oching (Chrome'da <strong className="text-white">⋮</strong> yoki Safari'da <Share2 size={13} className="inline text-blue-400" /> Ulashish).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                  2
                </span>
                <span>Ro'yxatdan <strong className="text-white font-semibold">"Bosh ekranga qo'shish" (Add to Home Screen)</strong> tugmasini tanlang.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                  3
                </span>
                <span>Ekraningizda <strong>GymNotes</strong> ilova belgisi paydo bo'ladi!</span>
              </div>
            </div>

            <button
              onClick={() => setShowIosInstructions(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs"
            >
              Tushundim
            </button>
          </div>
        </div>
      )}
    </>
  );
};
