import { Course } from 'src/entity';

export const checkInstructorTeachableCourse = (
  courses: Course[],
  courseId: number,
  courseName: string,
): string | null => {
  const canTeach = courses.some((teachable) => teachable.id === courseId);
  if (!canTeach) {
    return `Unavailable for ${courseName}.`;
  }
  return null;
};
