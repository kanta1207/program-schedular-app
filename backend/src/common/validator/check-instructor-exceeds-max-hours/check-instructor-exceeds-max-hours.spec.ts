import * as dayjs from 'dayjs';

import { Class, MasterWeekdaysRange } from 'src/entity';
import {
  MON_FRI_WEEKDAYS_RANGE_ID,
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from 'src/common/constants/master.constant';
import { checkInstructorExceedsMaxHours } from './check-instructor-exceeds-max-hours';

describe('checkInstructorExceedsMaxHours', () => {
  const monFriWeekdaysRange = {
    id: MON_FRI_WEEKDAYS_RANGE_ID,
  } as MasterWeekdaysRange;

  const monWedWeekdaysRange = {
    id: MON_WED_WEEKDAYS_RANGE_ID,
  } as MasterWeekdaysRange;

  const wedFriWeekdaysRange = {
    id: WED_FRI_WEEKDAYS_RANGE_ID,
  } as MasterWeekdaysRange;

  const message = () =>
    `Instructor will exceed maximum hours if assigned to this class. Overlapping cohort(s): ${overlap.overlappingCohortNames.join(
      ', ',
    )} Total weekly working hours will be ${totalWeeklyHoursInstructorAssigned} from ${dayjs(overlap.overlapStartAt).format('YYYY-MM-DD')} to ${dayjs(overlap.overlapEndAt).format('YYYY-MM-DD')}. Instructor's maximum weekly working hour is ${maxHoursOfInstructor}.`;

  it('should return null when maxHoursOfInstructor is null', () => {
    const result = checkInstructorExceedsMaxHours(
      null,
      [],
      new Date(),
      new Date(),
      1,
    );
    expect(result).toBeNull();
  });

  it('should return message when the instructor will exceed the maximum hours', () => {
    const mockClassesOfInstructor = [
      {
        weekdaysRange: monFriWeekdaysRange,
        startAt: new Date('2022-05-01'),
        endAt: new Date('2022-05-31'),
      } as Class,
      {
        weekdaysRange: monFriWeekdaysRange,
        startAt: new Date('2022-05-01'),
        endAt: new Date('2022-05-31'),
      } as Class,
    ];

    const maxHoursOfInstructor = 40;
    const startAtOfClass = new Date('2022-05-01');
    const endAtOfClass = new Date('2022-05-31');
    const weekdaysRangeId = MON_FRI_WEEKDAYS_RANGE_ID;

    const result = checkInstructorExceedsMaxHours(
      maxHoursOfInstructor,
      mockClassesOfInstructor,
      startAtOfClass,
      endAtOfClass,
      weekdaysRangeId,
    );

    expect(result).toBe(
      `Instructor will exceed maximum hours if assigned to this class. Overlapping cohort(s): ${overlap.overlappingCohortNames.join(
        ', ',
      )} Total weekly working hours will be ${totalWeeklyHoursInstructorAssigned} from ${dayjs(overlap.overlapStartAt).format('YYYY-MM-DD')} to ${dayjs(overlap.overlapEndAt).format('YYYY-MM-DD')}. Instructor's maximum weekly working hour is ${maxHoursOfInstructor}.`,
    );
  });

  it('should return null when the instructor will not exceed the maximum hours', () => {
    const maxHoursOfInstructor = 50;
    const startAtOfClass = new Date('2022-05-01');
    const endAtOfClass = new Date('2022-05-31');
    const weekdaysRangeId = MON_FRI_WEEKDAYS_RANGE_ID;

    const result = checkInstructorExceedsMaxHours(
      maxHoursOfInstructor,
      classesOfInstructor,
      startAtOfClass,
      endAtOfClass,
      weekdaysRangeId,
    );

    expect(result).toBeNull();
  });
});
