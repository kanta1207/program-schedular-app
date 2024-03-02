import { Classroom, Course, Intake, Program, WeekdaysRange } from './_index';

export interface Class {
  id: number;
  startAt: Date;
  endAt: Date;
}

export interface CreateClassResponse extends Class {
  cohort: {
    name: string;
    intake: Intake;
    program: Program;
  };
  weekdaysRange: WeekdaysRange;
  course: Course;
  classroom: Classroom;
  instructor: {
    id: number;
    name: string;
    isActive: boolean;
    desiredWorkingHour: number;
  };
}

export interface UpdateClassResponse extends Class {
  cohort: {
    name: string;
    intake: Intake;
    program: Program;
  };
  weekdaysRange: WeekdaysRange;
  course: Course;
  classroom: Classroom;
  instructor: {
    id: number;
    name: string;
    isActive: boolean;
    desiredWorkingHour: number;
  };
}
