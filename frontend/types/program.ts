import { GetCohortResponse } from './cohort';
import { CourseBase } from './course';

export interface ProgramBase {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface GetProgramResponse extends ProgramBase {
  cohorts: GetCohortResponse[];
  courses: CourseBase[];
}

export interface GetProgramsResponse extends GetProgramResponse {}

export interface CreateProgramResponse extends GetProgramResponse {}

export interface UpdateProgramResponse extends GetProgramResponse {}
