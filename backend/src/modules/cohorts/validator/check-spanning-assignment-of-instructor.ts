import { Class } from 'src/entity';
import {
  AFTERNOON_PERIOD_OF_DAY_ID,
  EVENING_PERIOD_OF_DAY_ID,
  MORNING_PERIOD_OF_DAY_ID,
} from '../../../common/constants/master.constant';
// TODO: We might want to take `day of the week` into account when new data like `SAT-SUN` is introduced.
/**
 * @param periodOfDayId - Period of Day of the Cohort the instructor is being assigned to
 * @param startAtOfClass - Start date of the Class the instructor is being assigned to
 * @param endAtOfClass - End date of the Class the instructor is being assigned to
 * @param classesOfInstructor - Classes the instructor is already assigned to
 * @returns An alert message when the instructor is assigned to both Morning and Evening class in the same term, else null
 */
export const checkSpanningAssignmentOfInstructor = (
  periodOfDayId: number,
  startAtOfClass: Date,
  endAtOfClass: Date,
  classesOfInstructor: Class[],
): string | null => {
  // Create new array of object which has overlapping duration(startAt and endAt) between morning class and evening class
  const overlapDurations = classesOfInstructor
    .map((clazz) => {
      const { startAt, endAt } = clazz;
      const isOverlapping = startAt <= endAtOfClass && endAt >= startAtOfClass;
      const isSpanningPeriod =
        (periodOfDayId === MORNING_PERIOD_OF_DAY_ID &&
          clazz.cohort.periodOfDay.id === EVENING_PERIOD_OF_DAY_ID) ||
        (periodOfDayId === EVENING_PERIOD_OF_DAY_ID &&
          clazz.cohort.periodOfDay.id === MORNING_PERIOD_OF_DAY_ID);

      if (isOverlapping && isSpanningPeriod) {
        return {
          startAt: startAt > startAtOfClass ? startAt : startAtOfClass,
          endAt: endAt < endAtOfClass ? endAt : endAtOfClass,
        };
      }

      return null;
    })
    .filter((duration) => duration !== null);

  // If there's at least one class that is not fully covered by afternoon classes, the class is spanning period.
  const hasUncoveredByAfternoonClasses = overlapDurations.some((duration) => {
    return classesOfInstructor.some(
      (clazz) =>
        clazz.cohort.periodOfDay.id === AFTERNOON_PERIOD_OF_DAY_ID &&
        !(clazz.startAt <= duration.startAt && clazz.endAt >= duration.endAt),
    );
  });

  if (hasUncoveredByAfternoonClasses) {
    return `Instructor is assigned to both Morning and Evening class in the same term`;
  }
  return null;
};
