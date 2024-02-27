import { Classroom, Cohort, Course, Instructor, WeekdaysRange } from './_index';

export interface Class {
  id: number;
  cohort: Cohort;
  weekdaysRange: WeekdaysRange;
  course: Course;
  startAt: Date;
  endAt: Date;
  instructor: Instructor | null;
  classroom: Classroom;
  createdAt?: Date;
  updatedAt?: Date;
}
