import { GetCoursesResponse } from '@/types/_index';

const getRequiredHours = (courseId: number, courses: GetCoursesResponse[]): number => {
  return courses.find((course) => course.id === courseId)?.requiredHours ?? 0;
};

export default getRequiredHours;
