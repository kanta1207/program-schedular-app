import { ProgramBase } from './program';

export interface CourseBase {
  id: number;
  name: string;
  requiredHours: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface GetCourseResponse extends CourseBase {
  program: ProgramBase;
}

export interface GetCoursesResponse extends GetCourseResponse {}

export interface CreateCourseResponse extends GetCourseResponse {}

export interface UpdateCourseResponse extends GetCourseResponse {}
