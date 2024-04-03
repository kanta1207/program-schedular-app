import {
  Class,
  Cohort,
  MasterPeriodOfDay,
  MasterWeekdaysRange,
} from 'src/entity';

import {
  AFTERNOON_PERIOD_OF_DAY_ID,
  MON_WED_WEEKDAYS_RANGE_ID,
  MORNING_PERIOD_OF_DAY_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../../common/constants/master.constant';

import { checkDuplicateAssignmentOfInstructor } from './check-duplicate-assignment-of-instructor';

// Declare the common data
const monWedWeekdaysRange = {
  id: MON_WED_WEEKDAYS_RANGE_ID,
} as MasterWeekdaysRange;

const wedFriWeekdaysRange = {
  id: WED_FRI_WEEKDAYS_RANGE_ID,
} as MasterWeekdaysRange;

const morningPeriodOfDay = {
  id: MORNING_PERIOD_OF_DAY_ID,
} as MasterPeriodOfDay;

const afternoonPeriodOfDay = {
  id: AFTERNOON_PERIOD_OF_DAY_ID,
} as MasterPeriodOfDay;

const morningCohort = {
  periodOfDay: morningPeriodOfDay,
} as Cohort;

const afternoonCohort = {
  periodOfDay: afternoonPeriodOfDay,
} as Cohort;

const class1 = {
  id: 1,
  weekdaysRange: monWedWeekdaysRange,
  startAt: new Date('2022-03-01'),
  endAt: new Date('2022-03-31'),
  cohort: morningCohort,
} as Class;

const message = 'Instructor is already assigned in this duration';

describe('checkDuplicateAssignmentOfInstructor', () => {
  it('should return message when the instructor has already been assigned in the same duration, same period of day, overlapping weekdays range', () => {
    // Arrange mock data
    // This class has overlapping duration, same period of day, overlapping weekdays range with the class1
    const mockNewClass = {
      id: 3,
      startAt: new Date('2022-02-21'),
      endAt: new Date('2022-03-14'),
      weekdaysRange: monWedWeekdaysRange,
      cohort: morningCohort,
    } as Class;
    const mockClassesOfInstructor = [class1, mockNewClass] as Class[];

    const result = checkDuplicateAssignmentOfInstructor(
      mockNewClass.cohort.periodOfDay.id,
      mockNewClass.id,
      mockNewClass.weekdaysRange.id,
      mockNewClass.startAt,
      mockNewClass.endAt,
      mockClassesOfInstructor,
    );

    expect(result).toBe(message);
  });

  it('should return null when the instructor has not been assigned in the same duration', () => {
    // Arrange mock data
    // This class has non-overlapping duration with the class1
    const mockNewClass = {
      id: 2,
      startAt: new Date('2022-04-01'),
      endAt: new Date('2022-04-30'),
      weekdaysRange: monWedWeekdaysRange,
      cohort: morningCohort,
    } as Class;
    const mockClassesOfInstructor = [class1, mockNewClass] as Class[];

    const result = checkDuplicateAssignmentOfInstructor(
      mockNewClass.cohort.periodOfDay.id,
      mockNewClass.id,
      mockNewClass.weekdaysRange.id,
      mockNewClass.startAt,
      mockNewClass.endAt,
      mockClassesOfInstructor,
    );

    expect(result).toBeNull();
  });

  it('should return null when the instructor has not been assigned in the same period of day', () => {
    // Arrange mock data
    // This class has different period of day with the class1
    const mockNewClass = {
      id: 2,
      startAt: new Date('2022-04-01'),
      endAt: new Date('2022-04-30'),
      weekdaysRange: monWedWeekdaysRange,
      cohort: afternoonCohort,
    } as Class;
    const mockClassesOfInstructor = [class1, mockNewClass] as Class[];

    const result = checkDuplicateAssignmentOfInstructor(
      mockNewClass.cohort.periodOfDay.id,
      mockNewClass.id,
      mockNewClass.weekdaysRange.id,
      mockNewClass.startAt,
      mockNewClass.endAt,
      mockClassesOfInstructor,
    );

    expect(result).toBeNull();
  });

  it('should return null when the instructor has not been assigned in the overlapping weekdays range', () => {
    // Arrange mock data
    // This class's weekdays range is not overlapping with the class1
    const mockNewClass = {
      id: 2,
      startAt: new Date('2022-04-01'),
      endAt: new Date('2022-04-30'),
      weekdaysRange: wedFriWeekdaysRange,
      cohort: morningCohort,
    } as Class;
    const mockClassesOfInstructor = [class1, mockNewClass] as Class[];

    const result = checkDuplicateAssignmentOfInstructor(
      mockNewClass.cohort.periodOfDay.id,
      mockNewClass.id,
      mockNewClass.weekdaysRange.id,
      mockNewClass.startAt,
      mockNewClass.endAt,
      mockClassesOfInstructor,
    );

    expect(result).toBeNull();
  });
});
