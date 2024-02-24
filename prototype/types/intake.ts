import { Cohort } from "./_index";

export interface Intake {
  id: number;
  startDate: Date;
  name: string;
  cohorts: Cohort[];
  createdAt?: Date;
  updatedAt?: Date;
}
