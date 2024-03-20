import { Class } from 'src/entity';
import {
  AFTERNOON_PERIOD_OF_DAY_ID,
  EVENING_PERIOD_OF_DAY_ID,
  MORNING_PERIOD_OF_DAY_ID,
} from '../../../common/constants/master.constant';

// TODO: We might want to take `day of the week` into account when new data like `SAT-SUN` is introduced.
/**
 * @param periodOfDayOfCohort - Period of Day of the Cohort the instructor is being assigned to
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
  /**
   * If the instructor is assigned to an afternoon class that overlaps with the new class,
   * We don't need to check for spanning assignment between morning and evening classes.
   */
  const hasOverlappingAfternoonClass = classesOfInstructor.some((clazz) => {
    const { startAt, endAt } = clazz;
    return (
      clazz.cohort.periodOfDay.id === AFTERNOON_PERIOD_OF_DAY_ID &&
      startAt <= endAtOfClass &&
      endAt >= startAtOfClass
    );
  });

  if (hasOverlappingAfternoonClass) {
    return null;
  }

  const relevantClasses = classesOfInstructor.filter((clazz) => {
    if (periodOfDayId === MORNING_PERIOD_OF_DAY_ID) {
      return clazz.cohort.periodOfDay.id === EVENING_PERIOD_OF_DAY_ID;
    }
    if (periodOfDayId === EVENING_PERIOD_OF_DAY_ID) {
      return clazz.cohort.periodOfDay.id === MORNING_PERIOD_OF_DAY_ID;
    }
    return false;
  });

  const hasOverlappingClasses = relevantClasses.some((clazz) => {
    const { startAt, endAt } = clazz;
    return startAt <= endAtOfClass && endAt >= startAtOfClass;
  });
  if (hasOverlappingClasses) {
    return `Instructor is assigned to both Morning and Evening class in the same term`;
  }
  return null;
};
