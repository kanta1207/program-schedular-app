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

interface FormattedClassField<T> {
  data: T;
  messages: string[];
}

export interface GetCohortClass extends ClassBase {
  cohort: CohortBase;
  course: CourseBase;
  weekdaysRange: FormattedClassField<WeekdaysRange>;
  instructor: FormattedClassField<InstructorBase | null>;
  classroom: FormattedClassField<Classroom>;
}

export interface GetCohortResponse extends CohortBase {
  intake: IntakeBase;
  program: ProgramBase;
  periodOfDay: PeriodOfDay;
  classes: GetCohortClass[];
}

export interface GetCohortsClass extends ClassBase {
  cohort: CohortBase;
  course: CourseBase;
  weekdaysRange: WeekdaysRange;
  instructor: InstructorBase | null;
  classroom: Classroom;
}

export interface GetCohortsResponse extends CohortBase {
  intake: IntakeBase;
  program: ProgramBase;
  periodOfDay: PeriodOfDay;
  classes: GetCohortsClass[];
}

export interface CreateCohortResponse extends GetCohortResponse {}

export interface UpdateCohortResponse extends GetCohortResponse {}

export interface UpdateCohortClassesResponse extends GetCohortsClass {}
