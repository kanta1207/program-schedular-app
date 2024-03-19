import { Class, MasterPeriodOfDay } from 'src/entity';

import {
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from 'src/common/constants/master.constant';

/**
 * @param periodOfDayOfCohort - Period of Day of the Cohort the instructor is being assigned to
 * @param classesOfInstructor - Classes the instructor is already assigned to
 * @returns an alert message when the instructor is already assigned in the same duration, else null
 */
export const checkDuplicateAssignmentOfInstructor = (
  periodOfDayOfCohort: MasterPeriodOfDay,
  classToBeAssigned: Class,
  classesOfInstructor: Class[],
): string | null => {
  const {
    id: idOfClassToBeAssigned,
    weekdaysRange: weekdaysRangeOfClassToBeAssigned,
    startAt: startAtOfClassToBeAssigned,
    endAt: endAtOfClassToBeAssigned,
  } = classToBeAssigned;
  // If the instructor is assigned to any classes with overlapping duration and the period of day, return an alert message
  for (const clazz of classesOfInstructor) {
    if (
      clazz.id !== idOfClassToBeAssigned &&
      clazz.startAt <= endAtOfClassToBeAssigned &&
      clazz.endAt >= startAtOfClassToBeAssigned &&
      clazz.cohort.periodOfDay.id === periodOfDayOfCohort.id
    ) {
      if (
        (weekdaysRangeOfClassToBeAssigned.id === MON_WED_WEEKDAYS_RANGE_ID &&
          clazz.weekdaysRange.id === WED_FRI_WEEKDAYS_RANGE_ID) ||
        (weekdaysRangeOfClassToBeAssigned.id === WED_FRI_WEEKDAYS_RANGE_ID &&
          clazz.weekdaysRange.id === MON_WED_WEEKDAYS_RANGE_ID)
      ) {
        continue;
      } else {
        return `Instructor is already assigned to the other class in the same duration`;
      }
    }
  }
  return null;
};
