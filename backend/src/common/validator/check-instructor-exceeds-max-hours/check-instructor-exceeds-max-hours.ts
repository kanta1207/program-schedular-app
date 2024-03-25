import * as dayjs from 'dayjs';

import { getOverlapsFromClasses } from '../../../common/utils';
import { Class } from 'src/entity';

/**
 * @param maxHoursOfInstructor - Maximum hours the instructor can be assigned to
 * @param classesOfInstructor - Classes the instructor is already assigned to
 * @param startAtOfClass - Start date of the new class
 * @param endAtOfClass - End date of the new class
 * @returns An alert message when the instructor will exceed the maximum hours if assigned to the new class
 */
export const checkInstructorExceedsMaxHours = (
  maxHoursOfInstructor: number | null,
  classesOfInstructor: Class[],
  startAtOfClass: Date,
  endAtOfClass: Date,
): string | null => {
  if (maxHoursOfInstructor) {
    // Get overlaps from instructor's existing classes
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

        const totalWeeklyHoursInstructorAssigned = overlap.totalWeeklyHours;

        if (totalWeeklyHoursInstructorAssigned > maxHoursOfInstructor) {
          const formattedOverlapStartAt = dayjs(overlapStartAt)
            .subtract(1, 'day')
            .format('YYYY-MM-DD');
          const formattedOverlapEndAt = dayjs(overlapEndAt)
            .subtract(1, 'day')
            .format('YYYY-MM-DD');
          return `Instructor will exceed maximum hours if assigned to this class. Total weekly working hours is ${totalWeeklyHoursInstructorAssigned}h. Max hours is ${maxHoursOfInstructor}h. Exceeding duration is ${formattedOverlapStartAt} to ${formattedOverlapEndAt}.`;
        }
      }
    }
  }
  return null;
};
