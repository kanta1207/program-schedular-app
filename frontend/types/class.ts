import {
  Classroom,
  CohortBase,
  CourseBase,
  InstructorBase,
  IntakeBase,
  PeriodOfDay,
  ProgramBase,
  WeekdaysRange,
} from './_index';

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
  instructor: InstructorBase;
  classroom: Classroom;
  course: CourseBase;
  weekdaysRange: WeekdaysRange;
  cohort: GetClassResponseCohort;
}

export interface GetClassesGroupByCohort extends CohortBase {
  intake: IntakeBase;
  classes: GetClassResponse[];
}

export interface GetClassesGroupByInstructor extends InstructorBase {
  classes: GetClassResponse[];
}

export type GetClassesResponse = GetClassesGroupByCohort | GetClassesGroupByInstructor;

export interface CreateClassResponse extends GetClassResponse {}

export interface UpdateClassResponse extends GetClassResponse {}
