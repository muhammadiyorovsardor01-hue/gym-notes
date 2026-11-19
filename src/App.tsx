import { useState, useEffect } from 'react';
import type { 
  WorkoutSession, 
  ExerciseItem, 
  PersonalRecord,
  WorkoutTemplate
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
  getDefaultRestDuration,
  getWorkoutTemplates,
  saveAllWorkoutTemplates,
  resetWorkoutTemplatesToDefault
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
import { TemplatesView } from './components/TemplatesView';
import { InstallShortcutBanner } from './components/InstallShortcutBanner';

export function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('workout');
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession | null>(null);
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [personalRecords, setPersonalRecords] = useState<Record<string, PersonalRecord>>({});

  // Modals state
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [targetDayIdForExercise, setTargetDayIdForExercise] = useState<string | null>(null);
  const [techniqueExercise, setTechniqueExercise] = useState<ExerciseItem | null>(null);
  const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
  const [restDuration, setRestDuration] = useState(90);
  const [finishedSession, setFinishedSession] = useState<WorkoutSession | null>(null);

  // Load persisted state on mount
  useEffect(() => {
    setExercises(getExercises());
    setTemplates(getWorkoutTemplates());
    setActiveWorkout(getActiveWorkout());
    setHistory(getWorkoutHistory());
    setPersonalRecords(getPersonalRecords());
    setRestDuration(getDefaultRestDuration());
  }, []);

  // Sync active workout to localStorage whenever it changes (guarantees NO data loss on page refresh)
  const handleUpdateActiveWorkout = (workout: WorkoutSession) => {
    setActiveWorkout(workout);
    saveActiveWorkout(workout);
  };

  // Update templates and save to localStorage
  const handleUpdateTemplates = (updated: WorkoutTemplate[]) => {
    setTemplates(updated);
    saveAllWorkoutTemplates(updated);
  };

  // Reset templates to default
  const handleResetTemplates = () => {
    if (confirm("Kunlik dasturlarni (Day 1, 2, 3) asl holatiga qaytarmoqchimisiz?")) {
      const reset = resetWorkoutTemplatesToDefault();
      setTemplates(reset);
    }
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
    exercises.forEach(e => exMap.set(e.id, e));

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
    setIsRestTimerOpen(false);

    // Switch to history tab to view achievements
    setCurrentTab('history');
  };

  // Handle selecting an exercise from modal
  const handleSelectExerciseFromModal = (exercise: ExerciseItem) => {
    if (targetDayIdForExercise) {
      // User is adding exercise to a specific Day (e.g. Day 1)
      const updated = templates.map(t => {
        if (t.id === targetDayIdForExercise) {
          // Check if already in this day
          if (t.exercises.some(e => e.exerciseId === exercise.id)) {
            return t;
          }
          return {
            ...t,
            exercises: [
              ...t.exercises,
              { exerciseId: exercise.id, setsCount: 3, targetReps: '10' }
            ]
          };
        }
        return t;
      });
      handleUpdateTemplates(updated);
      setTargetDayIdForExercise(null);
      setIsSelectorOpen(false);
      return;
    }

    // Otherwise, add to active workout
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
    <div className="min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
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
            onOpenExerciseSelector={() => {
              setTargetDayIdForExercise(null);
              setIsSelectorOpen(true);
            }}
            onOpenTechnique={(ex) => setTechniqueExercise(ex)}
            onTriggerRestTimer={() => setIsRestTimerOpen(true)}
            previousRecords={personalRecords}
          />
        )}

        {currentTab === 'templates' && (
          <TemplatesView
            templates={templates}
            exercises={exercises}
            onStartTemplate={handleStartTemplate}
            onOpenTechnique={(ex) => setTechniqueExercise(ex)}
            onUpdateTemplates={handleUpdateTemplates}
            onResetTemplates={handleResetTemplates}
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
