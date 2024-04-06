import { checkClassroomDuplication } from './check-classroom-duplication';
import { FormattedClass } from 'src/modules/cohorts/types';
import { Class } from 'src/entity';
import {
  MON_FRI_WEEKDAYS_RANGE_ID,
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../../common/constants/master.constant';

describe('checkClassroomDuplication', () => {
  // No overlap periods
  it('should not add error messages if there is no overlap periods', () => {
    const formattedClasses = [
      {
        startAt: new Date('2023-04-01'),
        endAt: new Date('2023-04-02'),
        classroom: { data: { id: 1 }, messages: [] },
        cohort: { id: 1 },
        weekdaysRange: {
          data: { id: MON_FRI_WEEKDAYS_RANGE_ID },
          messages: [],
        },
      },
    ] as FormattedClass[];

    const classesWithinPeriod = [
      {
        startAt: new Date('2023-05-01'),
        endAt: new Date('2023-05-02'),
        classroom: { id: 1 },
        cohort: { id: 1 },
        weekdaysRange: { id: MON_WED_WEEKDAYS_RANGE_ID },
      },
    ] as Class[];

    const result = checkClassroomDuplication(
      formattedClasses,
      classesWithinPeriod,
    );

    expect(result[0].classroom.messages).toHaveLength(0);
  });

  // Overlap periods and it's not allowed
  it('should add an error message if there is an overlap and it is not allowed', () => {
    const formattedClasses = [
      {
        startAt: new Date('2023-04-01'),
        endAt: new Date('2023-04-01'),
        classroom: { data: { id: 1 }, messages: [] },
        cohort: { id: 1 },
        weekdaysRange: {
          data: { id: MON_FRI_WEEKDAYS_RANGE_ID },
          messages: [],
        },
      },
    ] as FormattedClass[];

    const classesWithinPeriod = [
      {
        startAt: new Date('2023-04-01'),
        endAt: new Date('2023-04-01'),
        classroom: { id: 1 },
        cohort: { id: 1 },
        weekdaysRange: { id: MON_FRI_WEEKDAYS_RANGE_ID },
      },
    ] as Class[];

    const result = checkClassroomDuplication(
      formattedClasses,
      classesWithinPeriod,
    );

    expect(result[0].classroom.messages).toContain(
      'This classroom is used for other classes',
    );
  });

  // Overlap periods and it's allowed
  it('should not add an error message if there is an overlap but it is allowed', () => {
    const formattedClasses = [
      {
        startAt: new Date('2023-04-01'),
        endAt: new Date('2023-04-05'),
        classroom: { data: { id: 1 }, messages: [] },
        cohort: { id: 1 },
        weekdaysRange: {
          data: { id: MON_WED_WEEKDAYS_RANGE_ID },
          messages: [],
        },
      },
    ] as FormattedClass[];

    const classesWithinPeriod = [
      {
        startAt: new Date('2023-04-02'),
        endAt: new Date('2023-04-06'),
        classroom: { id: 1 },
        cohort: { id: 1 },
        weekdaysRange: { id: WED_FRI_WEEKDAYS_RANGE_ID },
      },
    ] as Class[];

    const result = checkClassroomDuplication(
      formattedClasses,
      classesWithinPeriod,
    );

    expect(result[0].classroom.messages).toHaveLength(0);
  });

  // Different classroom
  it('should not add an error message if classrooms are different, even if times overlap', () => {
    const formattedClasses = [
      {
        startAt: new Date('2023-04-01'),
        endAt: new Date('2023-04-01'),
        classroom: { data: { id: 2 }, messages: [] },
        cohort: { id: 1 },
        weekdaysRange: {
          data: { id: MON_FRI_WEEKDAYS_RANGE_ID },
          messages: [],
        },
      },
    ] as FormattedClass[];

    const classesWithinPeriod = [
      {
        startAt: new Date('2023-04-01'),
        endAt: new Date('2023-04-01'),
        classroom: { id: 1 },
        cohort: { id: 2 },
        weekdaysRange: { id: MON_WED_WEEKDAYS_RANGE_ID },
      },
    ] as Class[];

    const result = checkClassroomDuplication(
      formattedClasses,
      classesWithinPeriod,
    );

    expect(result[0].classroom.messages).toHaveLength(0);
  });
});
