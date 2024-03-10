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

interface GetCohortClass extends ClassBase {
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
