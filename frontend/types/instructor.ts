import { ContractType, CourseBase, GetClassResponse, PeriodOfDay, WeekdaysRange } from './_index';

export interface InstructorBase {
  id: number;
  name: string;
  isActive: boolean;
  desiredWorkingHours: number | null; // If only contract type is "contract", there's number.
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetInstructorResponse extends InstructorBase {
  contractType: ContractType;
  weekdaysRange: WeekdaysRange;
  periodOfDays: PeriodOfDay[];
  classes: GetClassResponse[];
  courses: CourseBase[];
}

interface AssignedHours {
  startAt: Date;
  endAt: Date;
  hours: number;
  isOverMaximum: boolean;
  isUnderMinimum: boolean;
  isUnderDesired: boolean;
}

export interface GetInstructorsWithHoursResponse extends GetInstructorsResponse {
  assignedHours: AssignedHours[];
}

export interface GetInstructorsResponse extends GetInstructorResponse {}

export interface CreateInstructorResponse extends GetInstructorResponse {}

export interface UpdateInstructorResponse extends GetInstructorResponse {}
