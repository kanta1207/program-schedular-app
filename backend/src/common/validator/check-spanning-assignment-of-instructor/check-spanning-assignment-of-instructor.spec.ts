import { Class, Cohort, MasterPeriodOfDay } from 'src/entity';
import {
  AFTERNOON_PERIOD_OF_DAY_ID,
  EVENING_PERIOD_OF_DAY_ID,
  MORNING_PERIOD_OF_DAY_ID,
} from '../../constants/master.constant';
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
    startAt: new Date('2022-03-01'),
    endAt: new Date('2022-03-31'),
  } as Class;

  const eveningClass = {
    cohort: { periodOfDay: eveningPeriodOfDay } as Cohort,
    startAt: new Date('2022-04-01'),
    endAt: new Date('2022-04-30'),
  } as Class;

  const classesOfInstructor = [morningClass, eveningClass];

  const message = 'Assigned to morning and evening, idle in afternoon.';
  it('should return message when the new class is in Morning, and the instructor is already assigned to Evening classes in the same term', () => {
    // Case A
    const periodOfDayOfCohortA = morningPeriodOfDay;
    const startAtOfClassA = new Date('2022-03-15');
    const endAtOfClassA = new Date('2022-04-01');

    const resultA = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohortA.id,
      startAtOfClassA,
      endAtOfClassA,
      classesOfInstructor,
    );

    // Case B
    const periodOfDayOfCohortB = morningPeriodOfDay;
    const startAtOfClassB = new Date('2022-04-30');
    const endAtOfClassB = new Date('2022-05-15');

    const resultB = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohortB.id,
      startAtOfClassB,
      endAtOfClassB,
      classesOfInstructor,
    );

    expect([resultA, resultB]).toEqual([message, message]);
  });

  it('should return message when the new class is in Evening, and the instructor is already assigned to Morning classes in the same term', () => {
    // Case A
    const periodOfDayOfCohortA = eveningPeriodOfDay;
    const startAtOfClassA = new Date('2022-2-15');
    const endAtOfClassA = new Date('2022-03-01');

    const resultA = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohortA.id,
      startAtOfClassA,
      endAtOfClassA,
      classesOfInstructor,
    );

    // Case B
    const periodOfDayOfCohortB = eveningPeriodOfDay;
    const startAtOfClassB = new Date('2022-03-31');
    const endAtOfClassB = new Date('2022-04-15');

    const resultB = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohortB.id,
      startAtOfClassB,
      endAtOfClassB,
      classesOfInstructor,
    );

    expect([resultA, resultB]).toEqual([message, message]);
  });

  it('should return null when the instructor is being assigned to Morning class, and is not assigned to Evening classes in the same term', () => {
    const periodOfDayOfCohort = morningPeriodOfDay;
    const startAtOfClass = new Date('2022-05-15');
    const endAtOfClass = new Date('2022-06-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort.id,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBeNull();
  });

  it('should return null when the instructor is being assigned to Evening class, and is not assigned to Morning classes in the same term', () => {
    const periodOfDayOfCohort = eveningPeriodOfDay;
    const startAtOfClass = new Date('2022-04-01');
    const endAtOfClass = new Date('2022-04-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort.id,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructor,
    );

    expect(result).toBeNull();
  });

  it('should return null when the instructor is being assigned to Afternoon class which fully overlap with the new class', () => {
    const afternoonClass = {
      cohort: { periodOfDay: afternoonPeriodOfDay } as Cohort,
      startAt: new Date('2022-04-01'),
      endAt: new Date('2022-04-31'),
    } as Class;

    const classesOfInstructorWithAfternoonClass = [
      ...classesOfInstructor,
      afternoonClass,
    ];

    const periodOfDayOfCohort = morningPeriodOfDay;
    const startAtOfClass = new Date('2022-04-01');
    const endAtOfClass = new Date('2022-04-15');

    const result = checkSpanningAssignmentOfInstructor(
      periodOfDayOfCohort.id,
      startAtOfClass,
      endAtOfClass,
      classesOfInstructorWithAfternoonClass,
    );

    expect(result).toBeNull();
  });
});
