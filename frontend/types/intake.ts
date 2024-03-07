import { PeriodOfDay, Classroom, Program } from './_index';

export interface Intake {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
}

export interface CreateIntakeResponse extends Intake {
  cohorts: {
    id: number;
    name: string;
    classroom: Classroom;
    program: Program;
    periodOfDay: PeriodOfDay;
  };
}

interface GetIntakesPeriodOfDay extends PeriodOfDay {
  cohorts: {
    id: number;
    name: string;
  }[];
}

export interface GetIntakesResponse extends Intake {
  periodOfDays: GetIntakesPeriodOfDay[];
}

export interface GetIntakeResponse extends Intake {
  cohorts: {
    id: number;
    name: string;
    classroom: Classroom;
    program: Program;
    periodOfDay: PeriodOfDay;
  };
}

export interface UpdateIntakeResponse extends Intake {
  cohorts: {
    id: number;
    name: string;
    classroom: Classroom;
    program: Program;
    periodOfDay: PeriodOfDay;
  };
}
