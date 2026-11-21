import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { CloudUserData, PersonalRecord, WorkoutSession, WorkoutTemplate, ExerciseItem } from '../types';
import { DEFAULT_PREFERENCES } from './storage';

const getCloudDocRef = (uid: string) => doc(db, 'users', uid, 'data', 'gymnotes');

export const sanitizeForFirestore = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data)) as T;
};

export const loadCloudData = async (uid: string): Promise<CloudUserData | null> => {
  const snap = await getDoc(getCloudDocRef(uid));
  if (!snap.exists()) return null;
  return snap.data() as CloudUserData;
};

export const saveCloudData = async (uid: string, data: CloudUserData): Promise<void> => {
  const payload = sanitizeForFirestore({
    ...data,
    updatedAt: Date.now(),
  });
  await setDoc(getCloudDocRef(uid), payload, { merge: true });
};

export const mergeCloudAndLocalData = (
  local: CloudUserData,
  cloud: CloudUserData
): CloudUserData => {
  // History: union by id, sorted newest first
  const historyMap = new Map<string, WorkoutSession>();
  (cloud.history || []).forEach((s) => historyMap.set(s.id, s));
  (local.history || []).forEach((s) => {
    if (!historyMap.has(s.id)) historyMap.set(s.id, s);
  });
  const history = Array.from(historyMap.values()).sort((a, b) => b.startTime - a.startTime);

  // Custom exercises: union by id
  const customMap = new Map<string, ExerciseItem>();
  (cloud.customExercises || []).forEach((ex) => customMap.set(ex.id, ex));
  (local.customExercises || []).forEach((ex) => {
    if (!customMap.has(ex.id)) customMap.set(ex.id, ex);
  });
  const customExercises = Array.from(customMap.values());

  // Templates: union by id (cloud templates + local-only templates)
  const templateMap = new Map<string, WorkoutTemplate>();
  (cloud.templates || []).forEach((t) => templateMap.set(t.id, t));
  (local.templates || []).forEach((t) => {
    if (!templateMap.has(t.id)) templateMap.set(t.id, t);
  });
  const templates = Array.from(templateMap.values());

  // Personal records: keep higher maxWeight per exerciseId
  const personalRecords: Record<string, PersonalRecord> = { ...(cloud.personalRecords || {}) };
  Object.entries(local.personalRecords || {}).forEach(([id, localPr]) => {
    const cloudPr = personalRecords[id];
    if (!cloudPr || localPr.maxWeight > cloudPr.maxWeight) {
      personalRecords[id] = localPr;
    }
  });

  // Active workout: preserve whichever has progress / newer startTime
  let activeWorkout: WorkoutSession | null = null;
  const localHasExercises = Boolean(local.activeWorkout && local.activeWorkout.exercises.length > 0);
  const cloudHasExercises = Boolean(cloud.activeWorkout && cloud.activeWorkout.exercises.length > 0);

  if (localHasExercises && !cloudHasExercises) {
    activeWorkout = local.activeWorkout;
  } else if (cloudHasExercises && !localHasExercises) {
    activeWorkout = cloud.activeWorkout;
  } else if (local.activeWorkout && cloud.activeWorkout) {
    activeWorkout =
      local.activeWorkout.startTime >= cloud.activeWorkout.startTime
        ? local.activeWorkout
        : cloud.activeWorkout;
  } else {
    activeWorkout = local.activeWorkout || cloud.activeWorkout || null;
  }

  const preferences = {
    ...DEFAULT_PREFERENCES,
    ...(local.preferences || {}),
    ...(cloud.preferences || {}),
  };

  return {
    templates,
    history,
    personalRecords,
    customExercises,
    activeWorkout,
    preferences,
    updatedAt: Date.now(),
  };
};

export const formatFirebaseErrorUz = (error: unknown): string => {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code || '')
      : '';

  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
    return '';
  }
  if (code === 'auth/unauthorized-domain') {
    return "Ushbu domen Firebase'da ruxsat etilmagan. Firebase Console → Authentication → Settings → Authorized domains ga domenni qo'shing.";
  }
  if (code === 'auth/operation-not-allowed') {
    return "Firebase Console → Authentication → Sign-in method bo'limida Google kirishni yoqing.";
  }
  if (code === 'permission-denied' || code === 'firestore/permission-denied') {
    return "Firestore ruxsati yo'q. Firebase Console → Firestore Database → Rules bo'limida qoidalarni Publish qiling.";
  }
  if (code === 'auth/network-request-failed') {
    return "Internet aloqasi yo'q. Tarmoqni tekshiring.";
  }
  return `Kirish/sinxronlashda xatolik yuz berdi (${code || 'unknown'}).`;
};
