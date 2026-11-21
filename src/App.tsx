import { useState, useEffect, useRef } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  type User,
} from 'firebase/auth';
import { auth, googleProvider } from './lib/firebase';
import { applyThemeToDocument } from './data/themes';
import type {
  WorkoutSession,
  ExerciseItem,
  PersonalRecord,
  WorkoutTemplate,
  ExerciseDifficulty,
  UserPreferences,
  SyncStatus,
  CloudUserData,
} from './types';
import {
  getExercises,
  saveCustomExercise,
  getCustomExercisesOnly,
  saveCustomExercisesList,
  getActiveWorkout,
  saveActiveWorkout,
  getWorkoutHistory,
  saveWorkoutToHistory,
  saveWorkoutHistoryList,
  deleteWorkoutFromHistory,
  getPersonalRecords,
  savePersonalRecordsMap,
  getWorkoutTemplates,
  saveAllWorkoutTemplates,
  getUserPreferences,
  saveUserPreferences,
  isCloudBannerDismissed,
  dismissCloudBanner,
} from './utils/storage';
import {
  loadCloudData,
  saveCloudData,
  mergeCloudAndLocalData,
  formatFirebaseErrorUz,
} from './utils/cloudSync';
import { getExerciseRestInfo } from './utils/restTimer';

import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import type { TabType } from './components/Navbar';
import { WorkoutActive } from './components/WorkoutActive';
import { ExerciseSelectorModal } from './components/ExerciseSelectorModal';
import { TechniqueModal } from './components/TechniqueModal';
import { RestTimer } from './components/RestTimerModal';
import { WorkoutSummaryModal } from './components/WorkoutSummaryModal';
import { ExercisesLibraryView } from './components/ExercisesLibraryView';
import { HistoryView } from './components/HistoryView';
import { TemplatesView } from './components/TemplatesView';
import { InstallShortcutBanner } from './components/InstallShortcutBanner';
import { CloudSyncBanner } from './components/CloudSyncBanner';
import { AccountPersonalizationModal } from './components/AccountPersonalizationModal';

export function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('workout');
  const [exercises, setExercises] = useState<ExerciseItem[]>(() => getExercises());
  const [templates, setTemplates] = useState<WorkoutTemplate[]>(() => getWorkoutTemplates());
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession | null>(() => getActiveWorkout());
  const [history, setHistory] = useState<WorkoutSession[]>(() => getWorkoutHistory());
  const [personalRecords, setPersonalRecords] = useState<Record<string, PersonalRecord>>(() =>
    getPersonalRecords()
  );
  const [preferences, setPreferences] = useState<UserPreferences>(() => getUserPreferences());

  // Auth & Cloud Sync state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [cloudBannerDismissed, setCloudBannerDismissed] = useState(() => isCloudBannerDismissed());

  // Modals state
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [targetDayIdForExercise, setTargetDayIdForExercise] = useState<string | null>(null);
  const [techniqueExercise, setTechniqueExercise] = useState<ExerciseItem | null>(null);
  const [restTimer, setRestTimer] = useState<{
    isOpen: boolean;
    seconds: number;
    triggerKey: number;
    exerciseName?: string;
    difficulty?: ExerciseDifficulty;
    difficultyLabel?: string;
  }>({
    isOpen: false,
    seconds: 60,
    triggerKey: 0,
  });
  const [finishedSession, setFinishedSession] = useState<WorkoutSession | null>(null);

  const isHydratingRef = useRef(false);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCloudSnapshotRef = useRef<string>('');

  // Apply theme immediately on mount and whenever preferences.theme changes
  useEffect(() => {
    applyThemeToDocument(preferences.theme);
  }, [preferences.theme]);

  // Helper to construct current cloud snapshot
  const buildCurrentCloudData = (): Omit<CloudUserData, 'updatedAt'> => ({
    templates,
    history,
    personalRecords,
    customExercises: getCustomExercisesOnly(),
    activeWorkout,
    preferences,
  });

  // Check redirect login result & subscribe to Firebase Auth state
  useEffect(() => {
    getRedirectResult(auth).catch((err) => {
      const msg = formatFirebaseErrorUz(err);
      if (msg) setAuthError(msg);
    });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setSyncStatus('idle');
        lastCloudSnapshotRef.current = '';
        return;
      }

      setUser(firebaseUser);
      setAuthError(null);
      setSyncStatus('syncing');
      isHydratingRef.current = true;

      try {
        const cloudData = await loadCloudData(firebaseUser.uid);
        const localSnapshot: CloudUserData = {
          templates: getWorkoutTemplates(),
          history: getWorkoutHistory(),
          personalRecords: getPersonalRecords(),
          customExercises: getCustomExercisesOnly(),
          activeWorkout: getActiveWorkout(),
          preferences: getUserPreferences(),
          updatedAt: Date.now(),
        };

        if (cloudData) {
          const merged = mergeCloudAndLocalData(localSnapshot, cloudData);

          saveAllWorkoutTemplates(merged.templates);
          saveWorkoutHistoryList(merged.history);
          savePersonalRecordsMap(merged.personalRecords);
          const mergedExercises = saveCustomExercisesList(merged.customExercises);
          saveActiveWorkout(merged.activeWorkout);
          saveUserPreferences(merged.preferences);

          setTemplates(merged.templates);
          setHistory(merged.history);
          setPersonalRecords(merged.personalRecords);
          setExercises(mergedExercises);
          setActiveWorkout(merged.activeWorkout);
          setPreferences(merged.preferences);

          const mergedCore = {
            templates: merged.templates,
            history: merged.history,
            personalRecords: merged.personalRecords,
            customExercises: merged.customExercises,
            activeWorkout: merged.activeWorkout,
            preferences: merged.preferences,
          };
          lastCloudSnapshotRef.current = JSON.stringify(mergedCore);
          await saveCloudData(firebaseUser.uid, merged);
        } else {
          const localCore = {
            templates: localSnapshot.templates,
            history: localSnapshot.history,
            personalRecords: localSnapshot.personalRecords,
            customExercises: localSnapshot.customExercises,
            activeWorkout: localSnapshot.activeWorkout,
            preferences: localSnapshot.preferences,
          };
          lastCloudSnapshotRef.current = JSON.stringify(localCore);
          await saveCloudData(firebaseUser.uid, localSnapshot);
        }

        setSyncStatus('synced');
        setLastSyncedAt(Date.now());
      } catch (err) {
        setSyncStatus('error');
        const msg = formatFirebaseErrorUz(err);
        if (msg) setAuthError(msg);
      } finally {
        isHydratingRef.current = false;
      }
    });

    return () => unsubscribe();
  }, []);

  // Debounced auto-sync whenever data changes while logged in
  useEffect(() => {
    if (!user || isHydratingRef.current) return;

    const coreSnapshot = {
      templates,
      history,
      personalRecords,
      customExercises: getCustomExercisesOnly(),
      activeWorkout,
      preferences,
    };
    const serialized = JSON.stringify(coreSnapshot);
    if (serialized === lastCloudSnapshotRef.current) return;

    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }

    syncTimerRef.current = setTimeout(async () => {
      if (!user || isHydratingRef.current) return;
      setSyncStatus('syncing');
      try {
        await saveCloudData(user.uid, {
          ...coreSnapshot,
          updatedAt: Date.now(),
        });
        lastCloudSnapshotRef.current = serialized;
        setSyncStatus('synced');
        setLastSyncedAt(Date.now());
      } catch (err) {
        setSyncStatus('error');
        const msg = formatFirebaseErrorUz(err);
        if (msg) setAuthError(msg);
      }
    }, 700);

    return () => {
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, [user, templates, history, personalRecords, exercises, activeWorkout, preferences]);

  const handleSignInGoogle = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const code =
        typeof err === 'object' && err !== null && 'code' in err
          ? String((err as { code?: unknown }).code || '')
          : '';
      if (
        code === 'auth/popup-blocked' ||
        code === 'auth/operation-not-supported-in-this-environment'
      ) {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr) {
          const msg = formatFirebaseErrorUz(redirectErr);
          if (msg) setAuthError(msg);
        }
      } else {
        const msg = formatFirebaseErrorUz(err);
        if (msg) setAuthError(msg);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
    } catch (err) {
      const msg = formatFirebaseErrorUz(err);
      if (msg) setAuthError(msg);
    }
  };

  const handleManualSync = async () => {
    if (!user) return;
    setSyncStatus('syncing');
    setAuthError(null);
    const coreSnapshot = buildCurrentCloudData();
    try {
      await saveCloudData(user.uid, {
        ...coreSnapshot,
        updatedAt: Date.now(),
      });
      lastCloudSnapshotRef.current = JSON.stringify(coreSnapshot);
      setSyncStatus('synced');
      setLastSyncedAt(Date.now());
    } catch (err) {
      setSyncStatus('error');
      const msg = formatFirebaseErrorUz(err);
      if (msg) setAuthError(msg);
    }
  };

  const handleUpdatePreferences = (updated: UserPreferences) => {
    setPreferences(updated);
    saveUserPreferences(updated);
  };

  const handleDismissCloudBanner = () => {
    setCloudBannerDismissed(true);
    dismissCloudBanner();
  };

  const handleTriggerRestTimer = (exercise: ExerciseItem) => {
    const info = getExerciseRestInfo(exercise);
    setRestTimer((prev) => ({
      isOpen: true,
      seconds: info.seconds,
      triggerKey: prev.triggerKey + 1,
      exerciseName: exercise.nameUz || exercise.name,
      difficulty: info.difficulty,
      difficultyLabel: info.labelUz,
    }));
  };

  // Auto-sync active workout to localStorage whenever it changes
  useEffect(() => {
    saveActiveWorkout(activeWorkout);
  }, [activeWorkout]);

  // Handle sudden mobile browser minimize or tab refresh
  useEffect(() => {
    const handleSave = () => {
      if (activeWorkout) {
        saveActiveWorkout(activeWorkout);
      }
    };
    window.addEventListener('beforeunload', handleSave);
    window.addEventListener('pagehide', handleSave);
    document.addEventListener('visibilitychange', handleSave);
    return () => {
      window.removeEventListener('beforeunload', handleSave);
      window.removeEventListener('pagehide', handleSave);
      document.removeEventListener('visibilitychange', handleSave);
    };
  }, [activeWorkout]);

  // Sync active workout to state and localStorage (immutable)
  const handleUpdateActiveWorkout = (workout: WorkoutSession) => {
    setActiveWorkout(workout);
    saveActiveWorkout(workout);
  };

  // Update templates and save to localStorage
  const handleUpdateTemplates = (updated: WorkoutTemplate[]) => {
    setTemplates(updated);
    saveAllWorkoutTemplates(updated);
  };

  // Open exercise selector specifically to add an exercise into a Day (e.g. Day 1)
  const handleOpenAddExerciseToDay = (templateId: string) => {
    setTargetDayIdForExercise(templateId);
    setIsSelectorOpen(true);
  };

  // Start a new blank workout session
  const handleStartWorkout = () => {
    const today = new Date();
    const dayNames = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
    const title = `${dayNames[today.getDay()]} mashg'uloti`;

    const newSession: WorkoutSession = {
      id: `workout-${Date.now()}`,
      title,
      startTime: Date.now(),
      exercises: [],
      totalVolume: 0,
      totalSets: 0,
      totalReps: 0,
    };

    setActiveWorkout(newSession);
    saveActiveWorkout(newSession);
    setCurrentTab('workout');
  };

  // Start a preset routine / day (Day 1, Day 2, Day 3)
  const handleStartTemplate = (template: WorkoutTemplate) => {
    if (activeWorkout && activeWorkout.exercises.length > 0) {
      if (!confirm("Hozir boshqa mashg'ulot davom etmoqda. Uni yangi dastur bilan almashtirmoqchimisiz?")) {
        return;
      }
    }

    const exMap = new Map<string, ExerciseItem>();
    exercises.forEach((e) => exMap.set(e.id, e));

    const workoutExercises = template.exercises.map((item, exIdx) => {
      const ex = exMap.get(item.exerciseId) || {
        id: item.exerciseId,
        name: item.exerciseId,
        nameUz: item.exerciseId,
        muscleGroup: 'chest' as const,
        cues: [],
        mistakes: [],
        youtubeQuery: `${item.exerciseId} form`,
      };

      const pr = personalRecords[ex.id];
      const defaultWeight = pr ? pr.maxWeight : 20;

      // Extract numeric reps target (e.g. "10" -> 10, "12-15" -> 12, "30-40 soniya" -> 35)
      const parsedReps = parseInt(item.targetReps, 10) || 10;

      const sets = Array.from({ length: item.setsCount }, (_, sIdx) => ({
        id: `set-${Date.now()}-${exIdx}-${sIdx}`,
        setNumber: sIdx + 1,
        weight: defaultWeight,
        reps: parsedReps,
        completed: false,
        type: 'regular' as const,
      }));

      return {
        id: `we-${Date.now()}-${exIdx}`,
        exerciseId: ex.id,
        exercise: ex,
        sets,
      };
    });

    const newSession: WorkoutSession = {
      id: `workout-${Date.now()}`,
      title: template.name,
      startTime: Date.now(),
      exercises: workoutExercises,
      totalVolume: 0,
      totalSets: 0,
      totalReps: 0,
    };

    handleUpdateActiveWorkout(newSession);
    setCurrentTab('workout');
  };

  // Cancel / Discard active workout
  const handleCancelWorkout = () => {
    if (confirm("Haqiqatan ham davom etayotgan mashg'ulotni bekor qilmoqchimisiz?")) {
      setActiveWorkout(null);
      saveActiveWorkout(null);
      setRestTimer((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Finish active workout
  const handleFinishWorkout = () => {
    if (!activeWorkout) return;

    let volume = 0;
    let completedSetsCount = 0;
    let totalRepsCount = 0;

    activeWorkout.exercises.forEach((we) => {
      we.sets.forEach((set) => {
        if (set.completed) {
          volume += (set.weight || 0) * (set.reps || 0);
          completedSetsCount += 1;
          totalRepsCount += set.reps || 0;
        }
      });
    });

    const completedSession: WorkoutSession = {
      ...activeWorkout,
      endTime: Date.now(),
      totalVolume: volume,
      totalSets: completedSetsCount,
      totalReps: totalRepsCount,
    };

    setFinishedSession(completedSession);
  };

  // Save completed session to history
  const handleSaveCompletedSession = () => {
    if (!finishedSession) return;

    const updatedHistory = saveWorkoutToHistory(finishedSession);
    setHistory(updatedHistory);
    setPersonalRecords(getPersonalRecords());

    // Clear active workout
    setActiveWorkout(null);
    saveActiveWorkout(null);
    setFinishedSession(null);
    setRestTimer((prev) => ({ ...prev, isOpen: false }));

    // Switch to history tab to view achievements
    setCurrentTab('history');
  };

  // Handle selecting an exercise from modal
  const handleSelectExerciseFromModal = (exercise: ExerciseItem) => {
    if (targetDayIdForExercise) {
      const updated = templates.map((t) => {
        if (t.id === targetDayIdForExercise) {
          if (t.exercises.some((e) => e.exerciseId === exercise.id)) {
            return t;
          }
          return {
            ...t,
            exercises: [
              ...t.exercises,
              { exerciseId: exercise.id, setsCount: 3, targetReps: '10' },
            ],
          };
        }
        return t;
      });
      handleUpdateTemplates(updated);
      setTargetDayIdForExercise(null);
      setIsSelectorOpen(false);
      return;
    }

    handleAddExerciseToWorkout(exercise);
  };

  // Add single exercise to active workout
  const handleAddExerciseToWorkout = (exercise: ExerciseItem) => {
    let session = activeWorkout;
    if (!session) {
      const today = new Date();
      const dayNames = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
      session = {
        id: `workout-${Date.now()}`,
        title: `${dayNames[today.getDay()]} mashg'uloti`,
        startTime: Date.now(),
        exercises: [],
        totalVolume: 0,
        totalSets: 0,
        totalReps: 0,
      };
    }

    const pr = personalRecords[exercise.id];
    const initialWeight = pr ? pr.maxWeight : 20;

    const newWorkoutExercise = {
      id: `we-${Date.now()}-${Math.random()}`,
      exerciseId: exercise.id,
      exercise,
      sets: [
        {
          id: `set-${Date.now()}-1`,
          setNumber: 1,
          weight: initialWeight,
          reps: 10,
          completed: false,
          type: 'regular' as const,
        },
      ],
    };

    const updatedSession = {
      ...session,
      exercises: [...session.exercises, newWorkoutExercise],
    };

    handleUpdateActiveWorkout(updatedSession);
    setCurrentTab('workout');
  };

  // Create custom exercise
  const handleAddNewCustomExercise = (newEx: ExerciseItem) => {
    const updated = saveCustomExercise(newEx);
    setExercises(updated);
  };

  // Delete past workout
  const handleDeleteWorkout = (id: string) => {
    const updated = deleteWorkoutFromHistory(id);
    setHistory(updated);
    setPersonalRecords(getPersonalRecords());
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <Header
        activeWorkoutCount={activeWorkout ? 1 : 0}
        user={user}
        syncStatus={syncStatus}
        onOpenAccount={() => setIsAccountModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-5">
        <InstallShortcutBanner />

        {!user && !cloudBannerDismissed && (
          <CloudSyncBanner
            onSignInGoogle={handleSignInGoogle}
            onDismiss={handleDismissCloudBanner}
            authLoading={authLoading}
          />
        )}

        {currentTab === 'workout' && (
          <WorkoutActive
            workout={activeWorkout}
            onStartNewWorkout={handleStartWorkout}
            onUpdateWorkout={handleUpdateActiveWorkout}
            onFinishWorkout={handleFinishWorkout}
            onCancelWorkout={handleCancelWorkout}
            onOpenExerciseSelector={() => {
              setTargetDayIdForExercise(null);
              setIsSelectorOpen(true);
            }}
            onOpenTechnique={(ex) => setTechniqueExercise(ex)}
            onTriggerRestTimer={handleTriggerRestTimer}
            previousRecords={personalRecords}
            weightUnit={preferences.weightUnit}
            weightStep={preferences.weightStep}
          />
        )}

        {currentTab === 'templates' && (
          <TemplatesView
            templates={templates}
            exercises={exercises}
            onStartTemplate={handleStartTemplate}
            onOpenTechnique={(ex) => setTechniqueExercise(ex)}
            onUpdateTemplates={handleUpdateTemplates}
            onOpenAddExerciseToDay={handleOpenAddExerciseToDay}
          />
        )}

        {currentTab === 'exercises' && (
          <ExercisesLibraryView
            exercises={exercises}
            onOpenTechnique={(ex) => setTechniqueExercise(ex)}
            onSelectForWorkout={(ex) => handleAddExerciseToWorkout(ex)}
          />
        )}

        {currentTab === 'history' && (
          <HistoryView
            history={history}
            personalRecords={personalRecords}
            onDeleteWorkout={handleDeleteWorkout}
            weightUnit={preferences.weightUnit}
            isSignedIn={!!user}
            onOpenAccount={() => setIsAccountModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Rest Timer */}
      <RestTimer
        initialSeconds={restTimer.seconds}
        triggerKey={restTimer.triggerKey}
        exerciseName={restTimer.exerciseName}
        difficulty={restTimer.difficulty}
        difficultyLabel={restTimer.difficultyLabel}
        soundEnabled={preferences.soundEnabled}
        isOpen={restTimer.isOpen}
        onClose={() => setRestTimer((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Modals */}
      <ExerciseSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => {
          setIsSelectorOpen(false);
          setTargetDayIdForExercise(null);
        }}
        exercises={exercises}
        onSelectExercise={handleSelectExerciseFromModal}
        onOpenTechnique={(ex) => setTechniqueExercise(ex)}
        onAddNewCustomExercise={handleAddNewCustomExercise}
      />

      <TechniqueModal
        exercise={techniqueExercise}
        onClose={() => setTechniqueExercise(null)}
      />

      <WorkoutSummaryModal
        session={finishedSession}
        isOpen={!!finishedSession}
        onSaveAndClose={handleSaveCompletedSession}
        weightUnit={preferences.weightUnit}
      />

      <AccountPersonalizationModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        user={user}
        authLoading={authLoading}
        authError={authError}
        syncStatus={syncStatus}
        lastSyncedAt={lastSyncedAt}
        onSignInGoogle={handleSignInGoogle}
        onSignOut={handleSignOut}
        onManualSync={handleManualSync}
        preferences={preferences}
        onUpdatePreferences={handleUpdatePreferences}
      />

      {/* Bottom Mobile Tab Bar */}
      <Navbar
        currentTab={currentTab}
        onChangeTab={(t) => setCurrentTab(t)}
        isWorkoutActive={!!activeWorkout}
      />
    </div>
  );
}

export default App;
