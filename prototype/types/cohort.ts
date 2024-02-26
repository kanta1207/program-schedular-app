import { Intake, PeriodOfDay, Program } from './_index';

export interface Cohort {
  id: number;
  name: string;
  intake: Intake;
  periodOfDay: PeriodOfDay;
  program: Program;
  createdAt?: Date;
  updatedAt?: Date;
}
