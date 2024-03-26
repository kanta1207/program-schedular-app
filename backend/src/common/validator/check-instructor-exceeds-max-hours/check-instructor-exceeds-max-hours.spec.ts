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
  id: 1,
  weekdaysRange: monFriWeekdaysRange,
  startAt: new Date('2022-03-01'),
  endAt: new Date('2022-03-31'),
} as Class;

const class2 = {
  id: 2,
  weekdaysRange: monWedWeekdaysRange,
  startAt: new Date('2022-03-01'),
  endAt: new Date('2022-03-15'),
} as Class;

const message = (
  totalWeeklyHoursInstructorAssigned: number,
  overlapStartAt: Date,
  overlapEndAt: Date,
  maxHoursOfInstructor: number,
) => {
  // TODO: dayjs is decreasing the date by 1 day only in frontend, and couldn't figure out why,
  // so subtracting the day by 1 in backend as a temporary solution.
  const formattedOverlapStartAt = dayjs(overlapStartAt)
    .subtract(1, 'day')
    .format('YYYY-MM-DD');
  const formattedOverlapEndAt = dayjs(overlapEndAt)
    .subtract(1, 'day')
    .format('YYYY-MM-DD');
  return `Instructor exceeds max working hour(${maxHoursOfInstructor}h/w). Current assigned hours: ${totalWeeklyHoursInstructorAssigned}h/w. Exceeding period: ${formattedOverlapStartAt} to ${formattedOverlapEndAt}.`;
};

describe('checkInstructorExceedsMaxHours', () => {
  it('should return null when maxHoursOfInstructor is null', () => {
    const result = checkInstructorExceedsMaxHours(
      null,
      [],
      new Date(),
      new Date(),
    );
    expect(result).toBeNull();
  });

  it('should return message when the new class is overlapping with the existing classes, and instructor will exceed the maximum hours', () => {
    // Arrange mock data
    const mockNewClass = {
      id: 3,
      // The new class is from 2022-02-21 to 2022-03-14, which is overlapping with the existing classes
      startAt: new Date('2022-02-21'),
      endAt: new Date('2022-03-14'),
      // The new class is on Monday and Friday,
      // So the weekly hours is 20, then the total weekly hours is 50, which will exceed the maximum hours
      weekdaysRange: monFriWeekdaysRange,
    } as Class;
    const mockClassesOfInstructor = [class1, class2, mockNewClass] as Class[];

    const maxHoursOfInstructor = 40;

    const result = checkInstructorExceedsMaxHours(
      maxHoursOfInstructor,
      mockClassesOfInstructor,
      mockNewClass.startAt,
      mockNewClass.endAt,
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

    expect(result).toBe(expectedMessage);
  });

  it('should return null when the new class is overlapping with the existing classes, but instructor will NOT exceed the maximum hours', () => {
    // Arrange mock data
    const mockNewClass = {
      id: 3,
      // The overlap period is from 2022-03-01 to 2022-03-14
      startAt: new Date('2022-02-21'),
      endAt: new Date('2022-03-14'),
      // The new class is on Monday and Wednesday,
      // So the weekly hours is 10, then the total weekly hours is 40, which will not exceed the maximum hours
      weekdaysRange: monWedWeekdaysRange,
    } as Class;
    const mockClassesOfInstructor = [class1, class2, mockNewClass] as Class[];

    const maxHoursOfInstructor = 40;

    const result = checkInstructorExceedsMaxHours(
      maxHoursOfInstructor,
      mockClassesOfInstructor,
      mockNewClass.startAt,
      mockNewClass.endAt,
    );

    expect(result).toBeNull();
  });

  it('should return null when the new class is NOT overlapping with the existing classes', () => {
    const mockNewClass = {
      id: 3,
      // The new class is from 2022-03-16 to 2022-03-31, which is not overlapping with the existing classes
      startAt: new Date('2022-03-16'),
      endAt: new Date('2022-03-31'),
      weekdaysRange: monFriWeekdaysRange,
    } as Class;

    // Arrange mock data
    const mockClassesOfInstructor = [class1, class2, mockNewClass] as Class[];

    const maxHoursOfInstructor = 40;

    const result = checkInstructorExceedsMaxHours(
      maxHoursOfInstructor,
      mockClassesOfInstructor,
      mockNewClass.startAt,
      mockNewClass.endAt,
    );

    expect(result).toBeNull();
  });
});
