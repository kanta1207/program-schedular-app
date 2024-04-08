import {
  Cohort,
  Course,
  Instructor,
  MasterClassroom,
  MasterWeekdaysRange,
} from '../../../entity';

interface FormattedClassField<T> {
  data: T;
  messages: string[];
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
