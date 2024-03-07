import { ContractType, Course, PeriodOfDay, WeekdaysRange } from './_index';

export interface Instructor {
  id: number;
  name: string;
  isActive: boolean;
  desiredWorkingHours: number;
  contractType: ContractType;
  weekdaysRange: WeekdaysRange;
  periodOfDays: PeriodOfDay[];
  courseIds: Course[];
  createdAt?: Date;
  updatedAt?: Date;
  notes: string | null;
}
