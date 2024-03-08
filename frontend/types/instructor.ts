import { ContractType, CourseBase, GetClassResponse, PeriodOfDay, WeekdaysRange } from './_index';

export interface InstructorBase {
  id: number;
  name: string;
  isActive: boolean;
  desiredWorkingHour: number | null; // If only contract type is "contract", there's number.
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetInstructorResponse extends InstructorBase {
  contractType: ContractType;
  weekdaysRange: WeekdaysRange;
  periodOfDays: PeriodOfDay[];
  classes: GetClassResponse;
  courses: CourseBase[];
}

export type GetInstructorsResponse = GetInstructorResponse[];

export interface CreateInstructorResponse extends GetInstructorResponse {}

export interface UpdateInstructorResponse extends GetInstructorResponse {}
