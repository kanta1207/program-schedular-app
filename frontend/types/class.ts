import { Classroom, CohortBase, CourseBase, InstructorBase, IntakeBase, ProgramBase, WeekdaysRange } from './_index';

export interface ClassBase {
  id: number;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface GetClassResponseCohort extends CohortBase {
  intake: IntakeBase;
  program: ProgramBase;
}

export interface GetClassResponse extends ClassBase {
  cohort: GetClassResponseCohort;
  weekdaysRange: WeekdaysRange;
  course: CourseBase;
  classroom: Classroom;
  instructor: InstructorBase;
}

export type GetClassesResponse = GetClassResponse[];

export interface CreateClassResponse extends GetClassResponse {}

export interface UpdateClassResponse extends GetClassResponse {}
