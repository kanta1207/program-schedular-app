import { PeriodOfDay, ProgramBase, CohortBase, ClassBase } from './_index';

export interface IntakeBase {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateIntakeCohorts extends CohortBase {
  intake: IntakeBase;
  periodOfDay: PeriodOfDay;
  program: ProgramBase;
  classes: ClassBase;
}
export interface CreateIntakeResponse extends IntakeBase {
  cohorts: CreateIntakeCohorts;
}

interface GetIntakesPeriodOfDay extends PeriodOfDay {
  cohorts: CohortBase[];
}

export interface GetIntakesResponse extends IntakeBase {
  periodOfDays: GetIntakesPeriodOfDay[];
}

interface GetIntakeCohorts extends CohortBase {
  intake: IntakeBase;
  periodOfDay: PeriodOfDay;
  program: ProgramBase;
  classes: ClassBase;
}

export interface GetIntakeResponse extends IntakeBase {
  cohorts: GetIntakeCohorts;
}

interface UpdateIntakeCohorts extends CohortBase {
  intake: IntakeBase;
  periodOfDay: PeriodOfDay;
  program: ProgramBase;
  classes: ClassBase;
}

export interface UpdateIntakeResponse extends IntakeBase {
  cohorts: UpdateIntakeCohorts;
}
