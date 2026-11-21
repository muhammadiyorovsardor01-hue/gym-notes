import type { ExerciseDifficulty, ExerciseItem } from '../types';
import { DEFAULT_EXERCISES } from '../data/defaultExercises';

export const MIN_REST_SECONDS = 30;
export const MAX_REST_SECONDS = 120;

export const clampRestSeconds = (seconds: number): number =>
  Math.min(MAX_REST_SECONDS, Math.max(MIN_REST_SECONDS, Math.round(seconds)));

export const formatRestShort = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const DIFFICULTY_LABELS: Record<ExerciseDifficulty, string> = {
  light: 'Yengil',
  medium: "O'rta",
  heavy: "Og'ir",
};

const HEAVY_KEYWORDS = [
  'squat',
  'deadlift',
  'stanovaya',
  'prised',
  'bench',
  'leg press',
  't-bar',
  'romanian',
  'rdl',
];

const MEDIUM_KEYWORDS = [
  'row',
  'pulldown',
  'pull-up',
  'pullup',
  'turnik',
  'incline',
  'shoulder press',
  'overhead',
  'dips',
  'brus',
  'push-up',
  'otjimaniya',
  'lunge',
];

export const getExerciseRestInfo = (
  exercise: ExerciseItem
): { seconds: number; difficulty: ExerciseDifficulty; labelUz: string } => {
  if (typeof exercise.restSeconds === 'number') {
    const seconds = clampRestSeconds(exercise.restSeconds);
    const difficulty: ExerciseDifficulty =
      exercise.difficulty ?? (seconds >= 105 ? 'heavy' : seconds >= 60 ? 'medium' : 'light');
    return { seconds, difficulty, labelUz: DIFFICULTY_LABELS[difficulty] };
  }

  const preset = DEFAULT_EXERCISES.find((e) => e.id === exercise.id);
  if (preset && typeof preset.restSeconds === 'number') {
    const seconds = clampRestSeconds(preset.restSeconds);
    const difficulty: ExerciseDifficulty =
      preset.difficulty ?? (seconds >= 105 ? 'heavy' : seconds >= 60 ? 'medium' : 'light');
    return { seconds, difficulty, labelUz: DIFFICULTY_LABELS[difficulty] };
  }

  const text = `${exercise.name} ${exercise.nameUz}`.toLowerCase();
  if (HEAVY_KEYWORDS.some((kw) => text.includes(kw))) {
    return { seconds: 120, difficulty: 'heavy', labelUz: DIFFICULTY_LABELS.heavy };
  }
  if (MEDIUM_KEYWORDS.some((kw) => text.includes(kw))) {
    return { seconds: 90, difficulty: 'medium', labelUz: DIFFICULTY_LABELS.medium };
  }

  let seconds = 60;
  let difficulty: ExerciseDifficulty = 'medium';

  switch (exercise.muscleGroup) {
    case 'legs':
    case 'back':
    case 'chest':
      seconds = 90;
      difficulty = 'medium';
      break;
    case 'shoulders':
      seconds = 60;
      difficulty = 'medium';
      break;
    case 'arms':
      seconds = 60;
      difficulty = 'light';
      break;
    case 'core':
    case 'cardio':
      seconds = 45;
      difficulty = 'light';
      break;
    case 'neck':
      seconds = 30;
      difficulty = 'light';
      break;
  }

  return {
    seconds: clampRestSeconds(seconds),
    difficulty,
    labelUz: DIFFICULTY_LABELS[difficulty],
  };
};
