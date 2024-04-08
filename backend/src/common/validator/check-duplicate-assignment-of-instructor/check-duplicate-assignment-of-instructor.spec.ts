import {
  Class,
  Cohort,
  MasterPeriodOfDay,
  MasterWeekdaysRange,
} from 'src/entity';

import {
  AFTERNOON_PERIOD_OF_DAY_ID,
  EVENING_PERIOD_OF_DAY_ID,
  MON_FRI_WEEKDAYS_RANGE_ID,
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

const monFriWeekdaysRange = {
  id: MON_FRI_WEEKDAYS_RANGE_ID,
} as MasterWeekdaysRange;

const morningCohort = {
  periodOfDay: {
    id: MORNING_PERIOD_OF_DAY_ID,
  } as MasterPeriodOfDay,
} as Cohort;

const afternoonCohort = {
  periodOfDay: {
    id: AFTERNOON_PERIOD_OF_DAY_ID,
  } as MasterPeriodOfDay,
} as Cohort;

const eveningCohort = {
  periodOfDay: {
    id: EVENING_PERIOD_OF_DAY_ID,
  } as MasterPeriodOfDay,
} as Cohort;

const message = 'Already assigned to another class.';

describe('checkDuplicateAssignmentOfInstructor', () => {
  describe('Expect: Return error message', () => {
    describe('Perspective of duration', () => {
      const mockExistingClass = {
        id: 1,
        startAt: new Date('2022-03-01'),
        endAt: new Date('2022-03-31'),
        weekdaysRange: monWedWeekdaysRange,
        cohort: morningCohort,
      } as Class;

      it('same weekdays range, same period, overlap duration (start date of given class is overlapping by one day)', () => {
        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-31'), // Overlapping by one day
          endAt: new Date('2022-03-14'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;
        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });

      it('same weekdays range, same period, overlap duration (end date of given class is overlapping by one day)', () => {
        const mockGivenClass = {
          id: 3,
          startAt: new Date('2022-02-01'),
          endAt: new Date('2022-03-01'), // Overlapping by one day
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;
        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });
    });
    describe('Perspective of weekdays range', () => {
      it('mon-wed and mon-wed, same period, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 3,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });
      it('wed-fri and wed-fri, same period, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: wedFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;
        const mockGivenClass = {
          id: 3,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: wedFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;
        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });

      it('mon-wed and mon-fri, same period, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 3,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });

      it('wed-fri and mon-fri, same period, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: wedFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 3,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });

      it('mon-fri and mon-wed, same period, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 3,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });

      it('mon-fri and wed-fri, same period, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 3,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: wedFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });
    });
    describe('Perspective of period of the day', () => {
      it('same weekdays range, morning and morning, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });

      it('same weekdays range, afternoon and afternoon, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: afternoonCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: afternoonCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });

      it('same weekdays range, evening and evening, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: eveningCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-01'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: eveningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBe(message);
      });
    });
  });

  describe('Expect: Return null', () => {
    describe('Perspective of duration', () => {
      const mockExistingClass = {
        id: 1,
        startAt: new Date('2022-03-02'),
        endAt: new Date('2022-03-31'),
        weekdaysRange: monWedWeekdaysRange,
        cohort: morningCohort,
      } as Class;

      it('same weekdays range, same period, no overlap duration (given class ends only one day earlier)', () => {
        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-02-14'),
          endAt: new Date('2022-03-01'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });

      it('same weekdays range, same period, no overlap duration (given class starts only one day later)', () => {
        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-04-01'),
          endAt: new Date('2022-04-30'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });
    });

    describe('Perspective of weekdays range', () => {
      it('mon-wed and wed-fri, same period, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: wedFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });

      it('wed-fri and mon-wed, same period, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: wedFriWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });
    });

    describe('Perspective of period of the day', () => {
      it('same weekdays range, morning and afternoon, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: afternoonCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });

      it('same weekdays range, morning and evening, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: eveningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });

      it('same weekdays range, afternoon and morning, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: afternoonCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });

      it('same weekdays range, afternoon and evening, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: afternoonCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: eveningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });

      it('same weekdays range, evening and morning, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: eveningCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: morningCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });

      it('same weekdays range, evening and afternoon, same duration', () => {
        const mockExistingClass = {
          id: 1,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: eveningCohort,
        } as Class;

        const mockGivenClass = {
          id: 2,
          startAt: new Date('2022-03-02'),
          endAt: new Date('2022-03-31'),
          weekdaysRange: monWedWeekdaysRange,
          cohort: afternoonCohort,
        } as Class;

        const mockClassesOfInstructor = [
          mockExistingClass,
          mockGivenClass,
        ] as Class[];

        const result = checkDuplicateAssignmentOfInstructor(
          mockGivenClass.cohort.periodOfDay.id,
          mockGivenClass.id,
          mockGivenClass.weekdaysRange.id,
          mockGivenClass.startAt,
          mockGivenClass.endAt,
          mockClassesOfInstructor,
        );

        expect(result).toBeNull();
      });
    });
  });
});
