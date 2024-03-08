import { ClassBase, CourseBase, InstructorBase, IntakeBase, PeriodOfDay, ProgramBase, WeekdaysRange } from './_index';

export interface CohortBase {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface GetCohortClass extends ClassBase {
  weekdaysRange: WeekdaysRange;
  course: CourseBase;
  instructor: InstructorBase;
}

export interface GetCohortResponse extends CohortBase {
  intake: IntakeBase;
  program: ProgramBase;
  periodOfDay: PeriodOfDay;
  classes: GetCohortClass[];
}

export type GetCohortsResponse = GetCohortResponse[];

export interface CreateCohortResponse extends GetCohortClass {}

export interface UpdateCohortResponse extends GetCohortClass {}
