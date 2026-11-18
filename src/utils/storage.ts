import type { WorkoutSession, ExerciseItem, PersonalRecord } from '../types';
import { DEFAULT_EXERCISES } from '../data/defaultExercises';

const STORAGE_KEYS = {
  ACTIVE_WORKOUT: 'gymnotes_active_workout',
  HISTORY: 'gymnotes_history',
  CUSTOM_EXERCISES: 'gymnotes_custom_exercises',
  PERSONAL_RECORDS: 'gymnotes_prs',
  REST_DURATION: 'gymnotes_rest_duration',
};

export const getExercises = (): ExerciseItem[] => {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXERCISES);
    const customList: ExerciseItem[] = custom ? JSON.parse(custom) : [];
    return [...DEFAULT_EXERCISES, ...customList];
  } catch (e) {
    console.error('Error reading exercises', e);
    return DEFAULT_EXERCISES;
  }
};

export const saveCustomExercise = (exercise: ExerciseItem): ExerciseItem[] => {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXERCISES);
    const customList: ExerciseItem[] = custom ? JSON.parse(custom) : [];
    customList.push(exercise);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EXERCISES, JSON.stringify(customList));
    return [...DEFAULT_EXERCISES, ...customList];
  } catch (e) {
    console.error('Error saving custom exercise', e);
    return DEFAULT_EXERCISES;
  }
};

export const getActiveWorkout = (): WorkoutSession | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error getting active workout', e);
    return null;
  }
};

export const saveActiveWorkout = (workout: WorkoutSession | null) => {
  try {
    if (workout) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(workout));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    }
  } catch (e) {
    console.error('Error saving active workout', e);
  }
};

export const getWorkoutHistory = (): WorkoutSession[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error getting history', e);
    return [];
  }
};

export const saveWorkoutToHistory = (session: WorkoutSession): WorkoutSession[] => {
  try {
    const history = getWorkoutHistory();
    const updated = [session, ...history];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));

    // Update PRs
    updatePersonalRecords(session);

    return updated;
  } catch (e) {
    console.error('Error saving history', e);
    return [];
  }
};

export const deleteWorkoutFromHistory = (id: string): WorkoutSession[] => {
  try {
    const history = getWorkoutHistory().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    return history;
  } catch (e) {
    console.error('Error deleting workout', e);
    return [];
  }
};

export const getPersonalRecords = (): Record<string, PersonalRecord> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PERSONAL_RECORDS);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Error getting PRs', e);
    return {};
  }
};

export const updatePersonalRecords = (session: WorkoutSession) => {
  try {
    const prs = getPersonalRecords();
    const dateStr = new Date(session.startTime).toLocaleDateString('uz-UZ');

    session.exercises.forEach(we => {
      we.sets.forEach(set => {
        if (!set.completed || set.weight <= 0) return;
        
        const existing = prs[we.exerciseId];
        if (!existing || set.weight > existing.maxWeight) {
          prs[we.exerciseId] = {
            exerciseId: we.exerciseId,
            exerciseName: we.exercise.nameUz || we.exercise.name,
            maxWeight: set.weight,
            maxRepsAtMaxWeight: set.reps,
            date: dateStr,
          };
        }
      });
    });

    localStorage.setItem(STORAGE_KEYS.PERSONAL_RECORDS, JSON.stringify(prs));
  } catch (e) {
    console.error('Error updating PRs', e);
  }
};

export const getDefaultRestDuration = (): number => {
  try {
    const dur = localStorage.getItem(STORAGE_KEYS.REST_DURATION);
    return dur ? parseInt(dur, 10) : 90;
  } catch {
    return 90;
  }
};

export const setDefaultRestDuration = (seconds: number) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REST_DURATION, seconds.toString());
  } catch (e) {
    console.error('Error saving default rest duration', e);
  }
};
