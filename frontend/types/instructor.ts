import { ContractType, Course, PeriodOfDay, WeekdaysRange } from './_index';

export interface Instructor {
  id: number;
  name: string;
  isActive: boolean;
  desiredWorkingHour: number;
  contractType: ContractType;
  weekdaysRange: WeekdaysRange;
  periodOfDays: PeriodOfDay[];
}

export interface CreateInstructorResponse extends Instructor {}

export interface GetInstructorsResponse extends Instructor {}

export interface GetInstructorResponse extends Instructor {
  courses: Course[];
}

export interface UpdateInstructorResponse extends Instructor {
  courses: Course[];
}
