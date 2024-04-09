import { Class } from '../../../entity';

import {
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../../common/constants/master.constant';

const message = 'Already assigned to another class.';
/**
 * Check if the instructor is already assigned in the overlapping duration, same period of day, overlapping weekdays range
 * @param periodOfDayId - Period of Day of the Cohort the instructor is being assigned to
 * @param classId - ID of the class the instructor is being assigned to
 * @param weekdaysRangeId - ID of the weekdays range of the class the instructor is being assigned to
 * @param classStartAt - Start date of the class the instructor is being assigned to
 * @param classEndAt - End date of the class the instructor is being assigned to
 * @param classesOfInstructor - Classes the instructor is already assigned to
 * @returns an alert message when the instructor is already assigned, else null
 */
export const checkDuplicateAssignmentOfInstructor = (
  periodOfDayId: number,
  classId: number,
  weekdaysRangeId: number,
  classStartAt: Date,
  classEndAt: Date,
  classesOfInstructor: Class[],
): string | null => {
  const isDuplicateAssignment = classesOfInstructor.some((clazz) => {
    // Instructor's class list includes the class being assigned to, so have to skip it
    if (clazz.id === classId) return false;

    // TODO: When SAT-SUN weekdays range is added, refactor this logic
    // If the combination of weekdays range is either MON_WED and WED_FRI or WED_FRI and MON_WED, it will not overlap so skip the check.
    if (
      (weekdaysRangeId === MON_WED_WEEKDAYS_RANGE_ID &&
        clazz.weekdaysRange.id === WED_FRI_WEEKDAYS_RANGE_ID) ||
      (weekdaysRangeId === WED_FRI_WEEKDAYS_RANGE_ID &&
        clazz.weekdaysRange.id === MON_WED_WEEKDAYS_RANGE_ID)
    )
      return false;

    const isDurationOverlapping =
      clazz.startAt <= classEndAt && clazz.endAt >= classStartAt;

    const isSamePeriod = clazz.cohort.periodOfDay.id === periodOfDayId;

    return isDurationOverlapping && isSamePeriod;
  });

  return isDuplicateAssignment ? message : null;
};
