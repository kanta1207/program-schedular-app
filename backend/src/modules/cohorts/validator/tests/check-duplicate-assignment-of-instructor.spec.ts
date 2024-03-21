import {
  Class,
  Cohort,
  MasterPeriodOfDay,
  MasterWeekdaysRange,
} from 'src/entity';
import { MON_WED_WEEKDAYS_RANGE_ID } from 'src/common/constants/master.constant';
import { checkDuplicateAssignmentOfInstructor } from '../check-duplicate-assignment-of-instructor';

describe('checkDuplicateAssignmentOfInstructor', () => {
  const periodOfDayOfCohort: MasterPeriodOfDay = {
    id: 1,
    name: 'Morning',
  } as MasterPeriodOfDay;
  const classToBeAssigned: Class = {
    id: 1,
    weekdaysRange: { id: MON_WED_WEEKDAYS_RANGE_ID, name: 'Mon-Wed' },
    startAt: new Date('2022-01-01'),
    endAt: new Date('2022-01-31'),
    cohort: { periodOfDay: { id: 1, name: 'Morning' } },
  } as Class;
  const classesOfInstructor: Class[] = [
    {
      id: 2,
      weekdaysRange: {
        id: MON_WED_WEEKDAYS_RANGE_ID,
        name: 'Mon-Wed',
      } as MasterWeekdaysRange,
      startAt: new Date('2022-02-01'),
      endAt: new Date('2022-02-28'),
      cohort: {
        periodOfDay: { id: 1, name: 'Morning' } as MasterPeriodOfDay,
      } as Cohort,
    } as Class,
    {
      id: 3,
      weekdaysRange: {
        id: MON_WED_WEEKDAYS_RANGE_ID,
        name: 'Mon-Wed',
      } as MasterWeekdaysRange,
      startAt: new Date('2022-02-01'),
      endAt: new Date('2022-02-28'),
      cohort: {
        periodOfDay: { id: 1, name: 'Morning' } as MasterPeriodOfDay,
      } as Cohort,
    } as Class,
  ];

  it('should return null when there is no duplicate assignment', () => {
    const result = checkDuplicateAssignmentOfInstructor(
      periodOfDayOfCohort,
      classToBeAssigned,
      classesOfInstructor,
    );
    expect(result).toBeNull();
  });

  it('should return an alert message when there is a duplicate assignment', () => {
    const duplicateClass: Class = {
      id: 4,
      weekdaysRange: {
        id: MON_WED_WEEKDAYS_RANGE_ID,
        name: 'Mon-Wed',
      } as MasterWeekdaysRange,
      startAt: new Date('2022-02-01'),
      endAt: new Date('2022-02-28'),
      cohort: {
        periodOfDay: { id: 1, name: 'Morning' } as MasterPeriodOfDay,
      } as Cohort,
    } as Class;

    classesOfInstructor.push(duplicateClass);

    const result = checkDuplicateAssignmentOfInstructor(
      periodOfDayOfCohort,
      classToBeAssigned,
      classesOfInstructor,
    );
    expect(result).toBe(
      'Instructor is already assigned to the other class in the same duration',
    );
  });
});
