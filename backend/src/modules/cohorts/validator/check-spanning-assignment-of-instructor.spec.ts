import { Class, Cohort, MasterPeriodOfDay } from 'src/entity';
import {
  AFTERNOON_PERIOD_OF_DAY_ID,
  EVENING_PERIOD_OF_DAY_ID,
  MORNING_PERIOD_OF_DAY_ID,
} from '../../../common/constants/master.constant';
import { checkSpanningAssignmentOfInstructor } from './check-spanning-assignment-of-instructor';

describe('checkSpanningAssignmentOfInstructor', () => {
  const morningPeriodOfDay: MasterPeriodOfDay = {
    id: MORNING_PERIOD_OF_DAY_ID,
  } as MasterPeriodOfDay;
  const eveningPeriodOfDay: MasterPeriodOfDay = {
    id: EVENING_PERIOD_OF_DAY_ID,
  } as MasterPeriodOfDay;
  const afternoonPeriodOfDay: MasterPeriodOfDay = {
    id: AFTERNOON_PERIOD_OF_DAY_ID,
  } as MasterPeriodOfDay;

  const morningClass: Class = {
    cohort: { periodOfDay: morningPeriodOfDay } as Cohort,
    startAt: new Date('2022-01-01'),
    endAt: new Date('2022-01-31'),
  } as Class;

  const eveningClass: Class = {
    cohort: { periodOfDay: eveningPeriodOfDay } as Cohort,
    startAt: new Date('2022-02-01'),
    endAt: new Date('2022-02-28'),
  } as Class;

  const afternoonClass: Class = {
    cohort: { periodOfDay: afternoonPeriodOfDay } as Cohort,
    startAt: new Date('2022-03-01'),
    endAt: new Date('2022-03-31'),
  } as Class;

  const classesOfInstructor: Class[] = [
    morningClass,
    eveningClass,
    afternoonClass,
  ];

  it('should return null when the instructor is assigned to an afternoon class that overlaps with the new class', () => {
    const periodOfDayOfCohort: MasterPeriodOfDay = afternoonPeriodOfDay;
    const startAtOfClass = new Date('2022-03-15');
    const endAtOfClass = new Date('2022-04-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBeNull();
  });

  it('should return message when the new class is in Morning, and the instructor is already assigned to Evening classes in the same term', () => {
    const periodOfDayOfCohort: MasterPeriodOfDay = morningPeriodOfDay;
    const startAtOfClass = new Date('2022-02-01');
    const endAtOfClass = new Date('2022-02-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBe(
      'Instructor is assigned to both Morning and Evening class in the same term',
    );
  });

  it('should return message when the new class is in Evening, and the instructor is already assigned to Morning classes in the same term', () => {
    const periodOfDayOfCohort: MasterPeriodOfDay = eveningPeriodOfDay;
    const startAtOfClass = new Date('2022-02-01');
    const endAtOfClass = new Date('2022-02-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBe(
      'Instructor is assigned to both Morning and Evening class in the same term',
    );
  });

  it('should return null when the instructor is not assigned to both Morning and Evening classes in the same term', () => {
    const periodOfDayOfCohort: MasterPeriodOfDay = morningPeriodOfDay;
    const startAtOfClass = new Date('2022-03-15');
    const endAtOfClass = new Date('2022-04-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBeNull();
  });
});
