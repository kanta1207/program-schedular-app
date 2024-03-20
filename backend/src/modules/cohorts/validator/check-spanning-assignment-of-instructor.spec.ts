import { Class, Cohort, MasterPeriodOfDay } from 'src/entity';
import {
  AFTERNOON_PERIOD_OF_DAY_ID,
  EVENING_PERIOD_OF_DAY_ID,
  MORNING_PERIOD_OF_DAY_ID,
} from '../../../common/constants/master.constant';
import { checkSpanningAssignmentOfInstructor } from './check-spanning-assignment-of-instructor';

describe('checkSpanningAssignmentOfInstructor', () => {
  const morningPeriodOfDay = {
    id: MORNING_PERIOD_OF_DAY_ID,
  } as MasterPeriodOfDay;
  const eveningPeriodOfDay = {
    id: EVENING_PERIOD_OF_DAY_ID,
  } as MasterPeriodOfDay;
  const afternoonPeriodOfDay = {
    id: AFTERNOON_PERIOD_OF_DAY_ID,
  } as MasterPeriodOfDay;

  const morningClass = {
    cohort: { periodOfDay: morningPeriodOfDay } as Cohort,
    startAt: new Date('2022-01-01'),
    endAt: new Date('2022-01-31'),
  } as Class;

  const eveningClass = {
    cohort: { periodOfDay: eveningPeriodOfDay } as Cohort,
    startAt: new Date('2022-02-01'),
    endAt: new Date('2022-02-28'),
  } as Class;

  const afternoonClass = {
    cohort: { periodOfDay: afternoonPeriodOfDay } as Cohort,
    startAt: new Date('2022-03-01'),
    endAt: new Date('2022-03-31'),
  } as Class;

  const classesOfInstructor = [morningClass, eveningClass, afternoonClass];

  it('should return null when the instructor is assigned to an afternoon class that overlaps with the new class', () => {
    const periodOfDayOfCohort = afternoonPeriodOfDay;
    const startAtOfClass = new Date('2022-03-15');
    const endAtOfClass = new Date('2022-04-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort.id,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBeNull();
  });

  it('should return message when the new class is in Morning, and the instructor is already assigned to Evening classes in the same term', () => {
    const periodOfDayOfCohort = morningPeriodOfDay;
    const startAtOfClass = new Date('2022-02-01');
    const endAtOfClass = new Date('2022-02-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort.id,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBe(
      'Instructor is assigned to both Morning and Evening class in the same term',
    );
  });

  it('should return message when the new class is in Evening, and the instructor is already assigned to Morning classes in the same term', () => {
    const periodOfDayOfCohort = eveningPeriodOfDay;
    const startAtOfClass = new Date('2022-01-01');
    const endAtOfClass = new Date('2022-01-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort.id,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBe(
      'Instructor is assigned to both Morning and Evening class in the same term',
    );
  });

  it('should return null when the instructor is being assigned to Morning class, and is already assigned to Evening classes in the same term', () => {
    const periodOfDayOfCohort = morningPeriodOfDay;
    const startAtOfClass = new Date('2022-03-15');
    const endAtOfClass = new Date('2022-04-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort.id,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBeNull();
  });

  it('should return null when the instructor is being assigned to Evening class, and is already assigned to Morning classes in the same term', () => {
    const periodOfDayOfCohort = eveningPeriodOfDay;
    const startAtOfClass = new Date('2022-02-01');
    const endAtOfClass = new Date('2022-02-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort.id,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBeNull();
  });
});
