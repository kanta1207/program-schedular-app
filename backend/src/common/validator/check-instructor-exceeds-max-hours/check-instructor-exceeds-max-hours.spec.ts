import * as dayjs from 'dayjs';

import { Class, MasterWeekdaysRange } from 'src/entity';

import {
  MON_FRI_WEEKDAYS_RANGE_ID,
  MON_WED_WEEKDAYS_RANGE_ID,
} from '../../../common/constants/master.constant';

import { checkInstructorExceedsMaxHours } from './check-instructor-exceeds-max-hours';

// Declare the common data
const monFriWeekdaysRange = {
  id: MON_FRI_WEEKDAYS_RANGE_ID,
} as MasterWeekdaysRange;

const monWedWeekdaysRange = {
  id: MON_WED_WEEKDAYS_RANGE_ID,
} as MasterWeekdaysRange;

const class1 = {
  weekdaysRange: monFriWeekdaysRange,
  startAt: new Date('2022-03-01'),
  endAt: new Date('2022-03-31'),
} as Class;

const class2 = {
  weekdaysRange: monWedWeekdaysRange,
  startAt: new Date('2022-03-01'),
  endAt: new Date('2022-03-15'),
} as Class;

const message = (
  totalWeeklyHoursInstructorAssigned: number,
  overlapStartAt: Date,
  overlapEndAt: Date,
  maxHoursOfInstructor: number,
) =>
  `Instructor will exceed maximum hours if assigned to this class. Total weekly working hours will be ${totalWeeklyHoursInstructorAssigned} from ${dayjs(overlapStartAt).format('YYYY-MM-DD')} to ${dayjs(overlapEndAt).format('YYYY-MM-DD')}. Instructor's maximum weekly working hour is ${maxHoursOfInstructor}.`;

describe('checkInstructorExceedsMaxHours', () => {
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

  it('should return message when the new class is overlapping with the existing classes, and instructor will exceed the maximum hours', () => {
    // Arrange mock data
    const mockClassesOfInstructor = [class1, class2] as Class[];

    const maxHoursOfInstructor = 40;
    // The new class is from 2022-02-21 to 2022-03-14, which is overlapping with the existing classes
    const startAtOfClass = new Date('2022-02-21');
    const endAtOfClass = new Date('2022-03-14');
    const weekdaysRangeId = MON_FRI_WEEKDAYS_RANGE_ID;

    const result = checkInstructorExceedsMaxHours(
      maxHoursOfInstructor,
      mockClassesOfInstructor,
      startAtOfClass,
      endAtOfClass,
      weekdaysRangeId,
    );

    // In total 50 weekly hours (class1: 20 + class2: 10 + newClass: 20)
    const totalWeeklyHoursInstructorAssigned = 50;

    // The overlap period is from 2022-03-01 to 2022-03-14
    const overlapStartAt = new Date('2022-03-01');

    const overlapEndAt = new Date('2022-03-14');

    const expectedMessage = message(
      totalWeeklyHoursInstructorAssigned,
      overlapStartAt,
      overlapEndAt,
      maxHoursOfInstructor,
    );

    console.log(result);
    console.log(expectedMessage);
    expect(result).toBe(expectedMessage);
  });

  it('should return null when the new class is overlapping with the existing classes, but instructor will NOT exceed the maximum hours', () => {
    // Arrange mock data
    const mockClassesOfInstructor = [class1, class2] as Class[];

    const maxHoursOfInstructor = 40;
    // The overlap period is from 2022-03-01 to 2022-03-14
    const startAtOfClass = new Date('2022-02-21');
    const endAtOfClass = new Date('2022-03-14');
    // The new class is on Monday and Wednesday,
    // So the weekly hours is 10, then the total weekly hours is 40, which will not exceed the maximum hours
    const weekdaysRangeId = MON_WED_WEEKDAYS_RANGE_ID;

    const result = checkInstructorExceedsMaxHours(
      maxHoursOfInstructor,
      mockClassesOfInstructor,
      startAtOfClass,
      endAtOfClass,
      weekdaysRangeId,
    );

    expect(result).toBeNull();
  });

  it('should return null when the new class is NOT overlapping with the existing classes', () => {
    // Arrange mock data
    const mockClassesOfInstructor = [class1, class2] as Class[];

    const maxHoursOfInstructor = 40;
    // The new class is from 2022-03-16 to 2022-03-31, which is not overlapping with the existing classes
    const startAtOfClass = new Date('2022-03-16');
    const endAtOfClass = new Date('2022-03-31');
    const weekdaysRangeId = MON_FRI_WEEKDAYS_RANGE_ID;

    const result = checkInstructorExceedsMaxHours(
      maxHoursOfInstructor,
      mockClassesOfInstructor,
      startAtOfClass,
      endAtOfClass,
      weekdaysRangeId,
    );

    expect(result).toBeNull();
  });
});
