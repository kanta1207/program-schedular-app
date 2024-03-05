import { ContractType, Course, PeriodOfDay, WeekdaysRange } from './_index';

export interface Instructor {
  id: number;
  name: string;
  isActive: boolean;
  desiredWorkingHours: number;
  contractType: ContractType;
  weekdaysRange: WeekdaysRange;
  periodOfDay: PeriodOfDay[];
  courses: Course[];
  createdAt?: Date;
  updatedAt?: Date;
  notes: string;
}
