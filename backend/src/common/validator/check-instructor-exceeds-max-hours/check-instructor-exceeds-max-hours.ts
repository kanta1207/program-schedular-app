import { getOverlapsFromClasses } from '../../../common/utils';
import { Class } from '../../../entity';

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
      if (startAtOfClass <= overlap.endAt && endAtOfClass >= overlap.startAt) {
        const totalWeeklyHoursInstructorAssigned = overlap.totalWeeklyHours;

        if (totalWeeklyHoursInstructorAssigned > maxHoursOfInstructor) {
          return `Exceeds ${maxHoursOfInstructor}h/w, assigned ${totalWeeklyHoursInstructorAssigned}h/w.`;
        }
      }
    }
  }
  return null;
};
