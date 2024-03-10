import { ClassBase } from './class';
import { CohortBase } from './cohort';
import { IntakeBase } from './intake';
import { PeriodOfDay } from './master';
import { ProgramBase } from './program';

export interface CourseBase {
  id: number;
  name: string;
  requiredHours: number;
  createdAt: Date;
  updatedAt: Date;
}

interface GetCoursesProgramCohorts extends CohortBase {
  intake: IntakeBase;
  periodOfDay: PeriodOfDay;
  program: ProgramBase;
  classes: ClassBase[];
}

interface GetCoursesProgram extends ProgramBase {
  cohorts: GetCoursesProgramCohorts;
  courses: CourseBase[];
}

interface GetCourseResponse extends CourseBase {
  program: GetCoursesProgram;
}

export interface GetCoursesResponse extends GetCourseResponse {}

export interface CreateCourseResponse extends GetCourseResponse {}

export interface UpdateCourseResponse extends GetCourseResponse {}
