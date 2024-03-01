import { PeriodOfDay, PeriodOfDayName, ClassroomName, ProgramName, Cohort } from './_index';

export interface Intake {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface GetIntakesPeriodOfDay extends PeriodOfDay {
  cohorts: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface GetIntakesResponse extends Intake {
  periodOfDays: GetIntakesPeriodOfDay[];
}

export interface GetIntakeByIdResponse extends Intake {
  cohorts: {
    id: number;
    name: string;
    classroom: {
      id: number;
      name: ClassroomName;
    };
    program: {
      id: number;
      name: ProgramName;
    };
    periodOfDay: {
      id: number;
      name: PeriodOfDayName;
    };
  };
}
