import { Class } from 'src/entity';
import { getWeeklyHours } from '..';

export interface Overlap {
  overlapStartAt: Date;
  overlapEndAt: Date;
  totalWeeklyHours: number;
}

/**
 * @param classes - Array of classes
 * @returns Array of {@link Overlap}
 */
export const getOverlapsFromClasses = (classes: Class[]): Overlap[] => {
  // Sort all classes by their duration
  const sortedClasses = classes.sort((a, b) => {
    const aDuration = a.endAt.getTime() - a.startAt.getTime();
    const bDuration = b.endAt.getTime() - b.startAt.getTime();
    return aDuration - bDuration;
  });

  const overlaps: {
    overlapStartAt: Date;
    overlapEndAt: Date;
    totalWeeklyHours: number;
  }[] = [];

  sortedClasses.forEach((currentClass) => {
    const weeklyHoursOfCurrentClass = getWeeklyHours(
      currentClass.weekdaysRange.id,
    );
    // Find the overlapping group for the current class
    let found = false;
    for (let i = 0; i < overlaps.length; i++) {
      // If the currentClass overlaps with the existing overlap group
      if (
        currentClass.startAt <= overlaps[i].overlapEndAt &&
        currentClass.endAt >= overlaps[i].overlapStartAt
      ) {
        // Update the overlap period if needed
        overlaps[i].overlapStartAt = new Date(
          Math.max(
            overlaps[i].overlapStartAt.getTime(),
            currentClass.startAt.getTime(),
          ),
        );
        overlaps[i].overlapEndAt = new Date(
          Math.min(
            overlaps[i].overlapEndAt.getTime(),
            currentClass.endAt.getTime(),
          ),
        );
        // Update the total hours of the overlap group
        overlaps[i].totalWeeklyHours += weeklyHoursOfCurrentClass;
        found = true;
      }
    }

    // If no overlapping group is found, create a new one
    if (!found) {
      for (let i = 0; i < classes.length; i++) {
        if (
          classes[i].id !== currentClass.id &&
          classes[i].startAt <= currentClass.endAt &&
          classes[i].endAt >= currentClass.startAt
        ) {
        }
      }
      overlaps.push({
        overlapStartAt: currentClass.startAt,
        overlapEndAt: currentClass.endAt,
        totalWeeklyHours: weeklyHoursOfCurrentClass,
      });
    }
  });

  return overlaps;
};
