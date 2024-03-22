import * as dayjs from 'dayjs';

import { getOverlapsFromClasses, getWeeklyHours } from '../../../common/utils';
import { Class } from 'src/entity';

/**
 * @param maxHoursOfInstructor - Maximum hours the instructor can be assigned to
 * @param classesOfInstructor - Classes the instructor is already assigned to
 * @param startAtOfClass - Start date of the new class
 * @param endAtOfClass - End date of the new class
 * @param weekdaysRangeOfNewClass - Weekdays range of the new class
 * @returns An alert message when the instructor will exceed the maximum hours if assigned to the new class
 */
export const checkInstructorExceedsMaxHours = (
  maxHoursOfInstructor: number | null,
  classesOfInstructor: Class[],
  startAtOfClass: Date,
  endAtOfClass: Date,
  weekdaysRangeId: number,
): string | null => {
  if (maxHoursOfInstructor) {
    const overlaps = getOverlapsFromClasses(classesOfInstructor);

    // Check if the new class overlaps with any of the existing classes
    for (const overlap of overlaps) {
      if (
        startAtOfClass <= overlap.overlapEndAt &&
        endAtOfClass >= overlap.overlapStartAt
      ) {
        // Correct the overlap start and end date, compare with the new class start and end date
        const overlapStartAt =
          startAtOfClass > overlap.overlapStartAt
            ? startAtOfClass
            : overlap.overlapStartAt;
        const overlapEndAt =
          endAtOfClass < overlap.overlapEndAt
            ? endAtOfClass
            : overlap.overlapEndAt;

        // Weekly hours of the class is 20 if the weekdays range is Monday to Friday, otherwise 10
        const weeklyHoursOfNewClass = getWeeklyHours(weekdaysRangeId);
        const totalWeeklyHoursInstructorAssigned =
          overlap.totalWeeklyHours + weeklyHoursOfNewClass;
        if (totalWeeklyHoursInstructorAssigned > maxHoursOfInstructor) {
          const formattedOverlapStartAt =
            dayjs(overlapStartAt).format('YYYY-MM-DD');
          const formattedOverlapEndAt =
            dayjs(overlapEndAt).format('YYYY-MM-DD');

          return `Instructor will exceed maximum hours if assigned to this class. Total weekly working hours will be ${totalWeeklyHoursInstructorAssigned} from ${formattedOverlapStartAt} to ${formattedOverlapEndAt}. Instructor's maximum weekly working hour is ${maxHoursOfInstructor}.`;
        }
      }
    }
  }
  return null;
};
