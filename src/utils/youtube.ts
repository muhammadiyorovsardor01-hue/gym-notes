import type { ExerciseItem } from '../types';

export const getExerciseShortsUrl = (exercise: ExerciseItem): string => {
  if (exercise.shortsId) {
    return `https://www.youtube.com/shorts/${exercise.shortsId}`;
  }
  const baseQuery = (exercise.shortsQuery || `${exercise.name} proper form shorts`)
    .replace(/#shorts/gi, '')
    .trim();
  const normalizedQuery = baseQuery.toLowerCase().includes('shorts')
    ? baseQuery
    : `${baseQuery} shorts`;

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(normalizedQuery)}&sp=EgQQARgB`;
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
  return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : null;
};
