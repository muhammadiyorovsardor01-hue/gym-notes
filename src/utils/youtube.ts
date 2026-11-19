import type { ExerciseItem } from '../types';

export const getExerciseShortsUrl = (exercise: ExerciseItem): string => {
  if (exercise.shortsId) {
    return `https://www.youtube.com/shorts/${exercise.shortsId}`;
  }
  const query = exercise.shortsQuery 
    ? exercise.shortsQuery 
    : `Jeff Nippard ${exercise.name} form technique shorts #shorts`;

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
};

export const getExerciseFullVideoUrl = (exercise: ExerciseItem): string => {
  if (exercise.youtubeId) {
    return `https://www.youtube.com/watch?v=${exercise.youtubeId}`;
  }
  const query = exercise.youtubeQuery 
    ? exercise.youtubeQuery 
    : `Jeff Nippard ${exercise.name} technique`;

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
};

export const getExerciseThumbnailUrl = (exercise: ExerciseItem): string | null => {
  const id = exercise.shortsId || exercise.youtubeId;
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
};
