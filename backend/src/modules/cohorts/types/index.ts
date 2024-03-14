import {
  Cohort,
  Course,
  Instructor,
  MasterClassroom,
  MasterWeekdaysRange,
} from 'src/entity';

interface FormattedClassField<T> {
  data: T;
  message: string[];
}

export interface FormattedClass {
  startAt: Date;
  endAt: Date;
  cohort: Cohort;
  course: Course;
  weekdaysRange: FormattedClassField<MasterWeekdaysRange>;
  classroom: FormattedClassField<MasterClassroom>;
  instructor: FormattedClassField<Instructor | null>;
}
