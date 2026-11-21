import type {
  WorkoutSession,
  ExerciseItem,
  PersonalRecord,
  WorkoutTemplate,
  UserPreferences,
} from '../types';
import { DEFAULT_EXERCISES } from '../data/defaultExercises';

const STORAGE_KEYS = {
  ACTIVE_WORKOUT: 'gymnotes_active_workout',
  HISTORY: 'gymnotes_history',
  CUSTOM_EXERCISES: 'gymnotes_custom_exercises',
  PERSONAL_RECORDS: 'gymnotes_prs',
  REST_DURATION: 'gymnotes_rest_duration',
  TEMPLATES_V2: 'gymnotes_templates_v2',
  PREFERENCES: 'gymnotes_preferences',
  CLOUD_BANNER_DISMISSED: 'gymnotes_cloud_banner_dismissed',
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'emerald',
  weightUnit: 'kg',
  weightStep: 2.5,
  soundEnabled: true,
};

export const getUserPreferences = (): UserPreferences => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error reading user preferences', e);
    return DEFAULT_PREFERENCES;
  }
};

export const saveUserPreferences = (prefs: UserPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  } catch (e) {
    console.error('Error saving user preferences', e);
  }
};

export const getCustomExercisesOnly = (): ExerciseItem[] => {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXERCISES);
    return custom ? JSON.parse(custom) : [];
  } catch (e) {
    console.error('Error reading custom exercises', e);
    return [];
  }
};

export const saveCustomExercisesList = (customList: ExerciseItem[]): ExerciseItem[] => {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EXERCISES, JSON.stringify(customList));
    return [...DEFAULT_EXERCISES, ...customList];
  } catch (e) {
    console.error('Error saving custom exercises list', e);
    return DEFAULT_EXERCISES;
  }
};

export const getExercises = (): ExerciseItem[] => {
  return [...DEFAULT_EXERCISES, ...getCustomExercisesOnly()];
};

export const saveCustomExercise = (exercise: ExerciseItem): ExerciseItem[] => {
  const customList = getCustomExercisesOnly();
  customList.push(exercise);
  return saveCustomExercisesList(customList);
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

export const saveWorkoutHistoryList = (history: WorkoutSession[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Error saving history list', e);
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
    const history = getWorkoutHistory().filter((item) => item.id !== id);
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

export const savePersonalRecordsMap = (prs: Record<string, PersonalRecord>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PERSONAL_RECORDS, JSON.stringify(prs));
  } catch (e) {
    console.error('Error saving PRs map', e);
  }
};

export const updatePersonalRecords = (session: WorkoutSession) => {
  try {
    const prs = getPersonalRecords();
    const dateStr = new Date(session.startTime).toLocaleDateString('uz-UZ');

    session.exercises.forEach((we) => {
      we.sets.forEach((set) => {
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

// WORKOUT TEMPLATES / ROUTINES (Fully editable & customizable)
export const getWorkoutTemplates = (): WorkoutTemplate[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TEMPLATES_V2);
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  } catch (e) {
    console.error('Error reading templates', e);
    return [];
  }
};

export const saveAllWorkoutTemplates = (templates: WorkoutTemplate[]): WorkoutTemplate[] => {
  try {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES_V2, JSON.stringify(templates));
    return templates;
  } catch (e) {
    console.error('Error saving templates', e);
    return templates;
  }
};

export const resetWorkoutTemplatesToDefault = (): WorkoutTemplate[] => {
  try {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES_V2, JSON.stringify([]));
    return [];
  } catch {
    return [];
  }
};

export const isCloudBannerDismissed = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEYS.CLOUD_BANNER_DISMISSED) === '1';
  } catch {
    return false;
  }
};

export const dismissCloudBanner = (): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CLOUD_BANNER_DISMISSED, '1');
  } catch {
    // ignore
  }
};
