import { Classroom, CohortBase, CourseBase, InstructorBase, PeriodOfDay, ProgramBase, WeekdaysRange } from './_index';

export interface ClassBase {
  id: number;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface GetClassResponseCohort extends CohortBase {
  program: ProgramBase;
  periodOfDay: PeriodOfDay;
}

export interface GetClassResponse extends ClassBase {
  cohort: GetClassResponseCohort;
  weekdaysRange: WeekdaysRange;
  course: CourseBase;
  classroom: Classroom;
  instructor: InstructorBase;
}

export interface GetClassesResponse extends GetClassResponse {}

export interface CreateClassResponse extends GetClassResponse {}

export interface UpdateClassResponse extends GetClassResponse {}
