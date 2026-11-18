import { useState, useEffect } from 'react';
import type { 
  WorkoutSession, 
  ExerciseItem, 
  PersonalRecord 
} from './types';
import { 
  getExercises, 
  saveCustomExercise, 
  getActiveWorkout, 
  saveActiveWorkout, 
  getWorkoutHistory, 
  saveWorkoutToHistory, 
  deleteWorkoutFromHistory,
  getPersonalRecords,
  getDefaultRestDuration
} from './utils/storage';

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
import { InstallShortcutBanner } from './components/InstallShortcutBanner';

export function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('workout');
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession | null>(null);
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [personalRecords, setPersonalRecords] = useState<Record<string, PersonalRecord>>({});

  // Modals state
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [techniqueExercise, setTechniqueExercise] = useState<ExerciseItem | null>(null);
  const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
  const [restDuration, setRestDuration] = useState(90);
  const [finishedSession, setFinishedSession] = useState<WorkoutSession | null>(null);

  // Load persisted state on mount
  useEffect(() => {
    setExercises(getExercises());
    setActiveWorkout(getActiveWorkout());
    setHistory(getWorkoutHistory());
    setPersonalRecords(getPersonalRecords());
    setRestDuration(getDefaultRestDuration());
  }, []);

  // Sync active workout to localStorage whenever it changes
  const handleUpdateActiveWorkout = (workout: WorkoutSession) => {
    setActiveWorkout(workout);
    saveActiveWorkout(workout);
  };

  // Start a new workout session
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

  // Cancel / Discard active workout
  const handleCancelWorkout = () => {
    if (confirm("Haqiqatan ham davom etayotgan mashg'ulotni bekor qilmoqchimisiz?")) {
      setActiveWorkout(null);
      saveActiveWorkout(null);
    }
  };

  // Finish active workout
  const handleFinishWorkout = () => {
    if (!activeWorkout) return;

    // Calculate totals
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
    setIsRestTimerOpen(false);

    // Switch to history tab to view achievements
    setCurrentTab('history');
  };

  // Add exercise to active workout
  const handleAddExerciseToWorkout = (exercise: ExerciseItem) => {
    let session = activeWorkout;
    if (!session) {
      // Auto-start workout if not yet started
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
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <Header activeWorkoutCount={activeWorkout ? 1 : 0} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-5">
        <InstallShortcutBanner />

        {currentTab === 'workout' && (
          <WorkoutActive
            workout={activeWorkout}
            onStartNewWorkout={handleStartWorkout}
            onUpdateWorkout={handleUpdateActiveWorkout}
            onFinishWorkout={handleFinishWorkout}
            onCancelWorkout={handleCancelWorkout}
            onOpenExerciseSelector={() => setIsSelectorOpen(true)}
            onOpenTechnique={(ex) => setTechniqueExercise(ex)}
            onTriggerRestTimer={() => setIsRestTimerOpen(true)}
            previousRecords={personalRecords}
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
          />
        )}
      </main>

      {/* Floating Rest Timer */}
      <RestTimer
        initialSeconds={restDuration}
        isOpen={isRestTimerOpen}
        onClose={() => setIsRestTimerOpen(false)}
      />

      {/* Modals */}
      <ExerciseSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        exercises={exercises}
        onSelectExercise={handleAddExerciseToWorkout}
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
