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

  for (let i = 0; i < sortedClasses.length; i++) {
    const currentClass = sortedClasses[i];
    const weeklyHoursOfCurrentClass = getWeeklyHours(
      currentClass.weekdaysRange.id,
    );
    for (let j = i + 1; j < sortedClasses.length; j++) {
      const targetClass = sortedClasses[j];
      const weeklyHoursOfTargetClass = getWeeklyHours(
        targetClass.weekdaysRange.id,
      );
      if (
        currentClass.startAt <= targetClass.endAt &&
        currentClass.endAt >= targetClass.startAt
      ) {
        // Calculate the overlap start at and end at date
        const overlapStartAt = new Date(
          Math.max(
            currentClass.startAt.getTime(),
            targetClass.startAt.getTime(),
          ),
        );
        const overlapEndAt = new Date(
          Math.min(currentClass.endAt.getTime(), targetClass.endAt.getTime()),
        );

        // Find the existing overlap group overlapping with the current overlap
        const existingOverlapIndex = overlaps.findIndex(
          (overlap) =>
            overlap.overlapStartAt.getTime() <= overlapEndAt.getTime() &&
            overlap.overlapEndAt.getTime() >= overlapStartAt.getTime(),
        );

        // If an existing overlap group is found, update the overlap start at, end at and total hours
        if (existingOverlapIndex !== -1) {
          // Update the overlap start at date
          overlaps[existingOverlapIndex].overlapStartAt = new Date(
            Math.max(
              overlaps[existingOverlapIndex].overlapStartAt.getTime(),
              overlapStartAt.getTime(),
            ),
          );
          // Update the overlap end at date
          overlaps[existingOverlapIndex].overlapEndAt = new Date(
            Math.min(
              overlaps[existingOverlapIndex].overlapEndAt.getTime(),
              overlapEndAt.getTime(),
            ),
          );
          // Update the total hours of the overlap groups
          overlaps[existingOverlapIndex].totalWeeklyHours +=
            weeklyHoursOfCurrentClass + weeklyHoursOfTargetClass;
        } else {
          // if no existing overlap group is found, create a new one
          overlaps.push({
            overlapStartAt,
            overlapEndAt,
            totalWeeklyHours:
              weeklyHoursOfCurrentClass + weeklyHoursOfTargetClass,
          });
        }
      }
    }
  }

  return overlaps;
};
