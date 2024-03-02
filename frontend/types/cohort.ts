import { Class, Course, Intake, PeriodOfDayName, Program, WeekdaysRange } from './_index';

export interface Cohort {
  id: number;
  name: string;
}

export interface CreateCohortResponse extends Cohort {
  intake: Intake;
  program: Program;
  periodOfDay: {
    id: number;
    name: PeriodOfDayName;
  };
  classes: GetCohortClass[];
}

export interface GetCohortsResponse extends Cohort {
  intake: Intake;
  program: Program;
  periodOfDay: {
    id: number;
    name: PeriodOfDayName;
  };
}

interface GetCohortClass extends Class {
  weekdaysRange: WeekdaysRange;
  course: Course;
  instructor: {
    id: number;
    name: string;
  };
}
export interface GetCohortResponse extends Cohort {
  intake: Intake;
  program: Program;
  periodOfDay: {
    id: number;
    name: PeriodOfDayName;
  };
  classes: GetCohortClass[];
}

export interface UpdateCohortResponse extends Cohort {
  intake: Intake;
  program: Program;
  periodOfDay: {
    id: number;
    name: PeriodOfDayName;
  };
  classes: GetCohortClass[];
}
