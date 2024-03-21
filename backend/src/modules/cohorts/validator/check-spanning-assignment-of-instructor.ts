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
  type DurationOfClass = Pick<Class, 'startAt' | 'endAt'>;
  /**
   * Array of durationOfClass the instructor is already assigned to, and overlaps with the new class.
   * Array of Morning classes if the new class is an Evening class,
   * if the new class is a Morning class, it will be an array of Evening classes
   */
  const relevantClassesDurations: DurationOfClass[] = [];
  /**
   * Array of Afternoon classes's durations the instructor is already assigned to, and overlaps with the new class
   */
  const afternoonClassesDurations: DurationOfClass[] = [];
  // Loop through the classes of the instructor to find the relevant classes and overlapping afternoon classes
  for (const clazz of classesOfInstructor) {
    const { startAt, endAt } = clazz;
    const isOverlapping = startAt <= endAtOfClass && endAt >= startAtOfClass;
    const isOverlappingAfternoonClass =
      clazz.cohort.periodOfDay.id === AFTERNOON_PERIOD_OF_DAY_ID &&
      isOverlapping;
    const isRelevantClass =
      (isOverlapping &&
        periodOfDayId === MORNING_PERIOD_OF_DAY_ID &&
        clazz.cohort.periodOfDay.id === EVENING_PERIOD_OF_DAY_ID) ||
      (isOverlapping &&
        periodOfDayId === EVENING_PERIOD_OF_DAY_ID &&
        clazz.cohort.periodOfDay.id === MORNING_PERIOD_OF_DAY_ID);
    //Push the class to each arrays if it meets the condition
    if (isOverlappingAfternoonClass) {
      afternoonClassesDurations.push({ startAt, endAt });
    } else if (isRelevantClass) {
      // If the class is relevant, figure out the overlapping duration and push it to the relevantClassesDurations array
      const overlappingDurationStartAt =
        startAt <= startAtOfClass ? startAtOfClass : startAt;
      const overlappingDurationEndAt =
        endAt >= endAtOfClass ? endAtOfClass : endAt;
      relevantClassesDurations.push({
        startAt: overlappingDurationStartAt,
        endAt: overlappingDurationEndAt,
      });
    }
  }

  // Loop through the relevant classes durations to remove the ones that are overlapping with the overlapping afternoon classes durations
  for (const afternoonClassDuration of afternoonClassesDurations) {
    for (let i = 0; i < relevantClassesDurations.length; i++) {
      if (
        relevantClassesDurations[i].startAt >= afternoonClassDuration.startAt &&
        relevantClassesDurations[i].endAt <= afternoonClassDuration.endAt
      ) {
        relevantClassesDurations.splice(i, 1);
      }
    }
  }
  // If there are any relevant classes left, it means the instructor is assigned to both Morning and Evening class in the same term, with no overlapping afternoon classes
  if (relevantClassesDurations.length > 0) {
    return `Instructor is assigned to both Morning and Evening class in the same term`;
  }
  return null;
};
