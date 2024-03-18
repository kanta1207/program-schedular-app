import {
  Cohort,
  Course,
  Instructor,
  MasterClassroom,
  MasterWeekdaysRange,
} from 'src/entity';

interface FormattedClassField<T> {
  data: T;
  messages: string[];
}

export interface FormattedClass {
  startAt: Date;
  endAt: Date;
  cohort: Cohort;
  course: Course;
  messages: string[];
  weekdaysRange: FormattedClassField<MasterWeekdaysRange>;
  classroom: FormattedClassField<MasterClassroom>;
  instructor: FormattedClassField<Instructor | null>;
}
