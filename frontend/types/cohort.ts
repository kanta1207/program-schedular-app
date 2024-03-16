import {
  ClassBase,
  Classroom,
  CourseBase,
  InstructorBase,
  IntakeBase,
  PeriodOfDay,
  ProgramBase,
  WeekdaysRange,
} from './_index';

export interface CohortBase {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetCohortClass extends ClassBase {
  cohort: CohortBase;
  weekdaysRange: WeekdaysRange;
  course: CourseBase;
  instructor?: InstructorBase;
  classroom: Classroom;
}

export interface GetCohortResponse extends CohortBase {
  intake: IntakeBase;
  program: ProgramBase;
  periodOfDay: PeriodOfDay;
  classes: GetCohortClass[];
}

export interface GetCohortsResponse extends GetCohortResponse {}

export interface CreateCohortResponse extends GetCohortResponse {}

export interface UpdateCohortResponse extends GetCohortResponse {}

export interface UpdateCohortClassesResponse extends GetCohortClass {}
