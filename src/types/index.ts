export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'legs' 
  | 'shoulders' 
  | 'arms' 
  | 'core' 
  | 'neck'
  | 'cardio';

export interface ExerciseItem {
  id: string;
  name: string;
  nameUz: string;
  muscleGroup: MuscleGroup;
  cues: string[];
  mistakes: string[];
  youtubeQuery: string;
  youtubeId?: string;
  shortsId?: string;
  shortsQuery?: string;
  isCustom?: boolean;
}

export type SetType = 'regular' | 'warmup' | 'drop' | 'failure';

export interface ExerciseSet {
  id: string;
  setNumber: number;
  weight: number; // kg
  reps: number;
  completed: boolean;
  type: SetType;
  rpe?: number; // 1-10 (Rate of Perceived Exertion)
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise: ExerciseItem;
  sets: ExerciseSet[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  title: string;
  startTime: number;
  endTime?: number;
  exercises: WorkoutExercise[];
  notes?: string;
  totalVolume: number; // total kg lifted
  totalSets: number;
  totalReps: number;
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  maxWeight: number; // kg
  maxRepsAtMaxWeight: number;
  date: string;
}

export interface TemplateExerciseItem {
  exerciseId: string;
  setsCount: number;
  targetReps: string; // e.g. "10", "12", "30-40 soniya"
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  dayBadge: string; // e.g. "1-kun", "2-kun", "3-kun"
  exercises: TemplateExerciseItem[];
  isCustom?: boolean;
}
