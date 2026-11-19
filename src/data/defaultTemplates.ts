import type { WorkoutTemplate } from '../types';

export const DEFAULT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: 'day-1-full-body',
    name: 'Day 1 — Full Body',
    description: "Squats, Bench Press, Cable Rows va yelka-triceps mashqlari",
    dayBadge: '1-kun',
    exercises: [
      { exerciseId: 'squats', setsCount: 3, targetReps: '10' },
      { exerciseId: 'bench-press', setsCount: 3, targetReps: '10' },
      { exerciseId: 'cable-rows', setsCount: 3, targetReps: '12' },
      { exerciseId: 'dumbbell-shoulder-press', setsCount: 3, targetReps: '10' },
      { exerciseId: 'triceps-pushdowns', setsCount: 3, targetReps: '12' },
      { exerciseId: 'lateral-raises', setsCount: 3, targetReps: '12' },
      { exerciseId: 'seated-calf-raises', setsCount: 3, targetReps: '15' },
      { exerciseId: 'planks', setsCount: 3, targetReps: '30-40 soniya' },
      { exerciseId: 'dumbbell-shrugs', setsCount: 2, targetReps: '12-15' },
    ],
  },
  {
    id: 'day-2-full-body',
    name: 'Day 2 — Full Body',
    description: "Deadlifts, Lat Pulldowns, Incline Press, Biceps va Bo'yin",
    dayBadge: '2-kun',
    exercises: [
      { exerciseId: 'deadlifts', setsCount: 3, targetReps: '6' },
      { exerciseId: 'lat-pulldowns', setsCount: 3, targetReps: '10' },
      { exerciseId: 'incline-press', setsCount: 3, targetReps: '10' },
      { exerciseId: 'biceps-curls', setsCount: 3, targetReps: '12' },
      { exerciseId: 'hammer-curls', setsCount: 2, targetReps: '10-12' },
      { exerciseId: 'reverse-fly', setsCount: 3, targetReps: '12' },
      { exerciseId: 'standing-calf-raises', setsCount: 3, targetReps: '15' },
      { exerciseId: 'neck-isometrics', setsCount: 2, targetReps: '10-15 soniya' },
    ],
  },
  {
    id: 'day-3-full-body',
    name: 'Day 3 — Full Body',
    description: "Leg Press, T-Bar Rows, Chest Fly, Triceps va Press",
    dayBadge: '3-kun',
    exercises: [
      { exerciseId: 'leg-press', setsCount: 3, targetReps: '10' },
      { exerciseId: 't-bar-rows', setsCount: 3, targetReps: '10' },
      { exerciseId: 'chest-fly', setsCount: 3, targetReps: '12' },
      { exerciseId: 'triceps-extensions', setsCount: 3, targetReps: '12' },
      { exerciseId: 'hammer-curls', setsCount: 2, targetReps: '10-12' },
      { exerciseId: 'cable-lateral-raises', setsCount: 2, targetReps: '12-15' },
      { exerciseId: 'decline-crunches', setsCount: 3, targetReps: '12' },
      { exerciseId: 'dumbbell-shrugs', setsCount: 2, targetReps: '12-15' },
      { exerciseId: 'face-pulls', setsCount: 2, targetReps: '15' },
    ],
  },
];
