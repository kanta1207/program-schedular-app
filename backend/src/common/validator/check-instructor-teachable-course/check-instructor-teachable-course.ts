import { Course } from '../../../entity';

export const checkInstructorTeachableCourse = (
  courses: Course[],
  courseId: number,
): string | null => {
  const canTeach = courses.some((teachable) => teachable.id === courseId);
  if (!canTeach) {
    return `Instructor is not able to teach this course`;
  }
  return null;
};
