import { Cohort } from './_index';

export interface Intake {
  id: number;
  startAt: Date;
  endAt: Date;
  name: string;
  cohorts: Cohort[];
  createdAt?: Date;
  updatedAt?: Date;
}
