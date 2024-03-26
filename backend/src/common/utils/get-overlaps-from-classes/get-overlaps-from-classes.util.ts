import { Class } from 'src/entity';
import { getWeeklyHours } from '..'; // Adjust the import path as necessary

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
  // Step 1: Sort Classes by Start Time
  const sortedClasses = classes.sort(
    (a, b) => a.startAt.getTime() - b.startAt.getTime(),
  );

  const overlaps: Overlap[] = [];

  // Step 2: Find Overlaps and Group Overlapping Classes
  sortedClasses.forEach((currentClass, i) => {
    for (let j = i + 1; j < sortedClasses.length; j++) {
      const targetClass = sortedClasses[j];

      // Check if classes overlap
      if (currentClass.endAt > targetClass.startAt) {
        const overlapStartAt = new Date(
          Math.max(
            currentClass.startAt.getTime(),
            targetClass.startAt.getTime(),
          ),
        );
        const overlapEndAt = new Date(
          Math.min(currentClass.endAt.getTime(), targetClass.endAt.getTime()),
        );

        // Attempt to find an existing overlap group that this new overlap fits into
        const existingOverlap = overlaps.find(
          (o) =>
            o.overlapStartAt <= overlapEndAt &&
            o.overlapEndAt >= overlapStartAt,
        );

        if (existingOverlap) {
          // If found, update the existing group's overlap period
          existingOverlap.overlapStartAt = new Date(
            Math.min(
              existingOverlap.overlapStartAt.getTime(),
              overlapStartAt.getTime(),
            ),
          );
          existingOverlap.overlapEndAt = new Date(
            Math.max(
              existingOverlap.overlapEndAt.getTime(),
              overlapEndAt.getTime(),
            ),
          );
        } else {
          // If no existing group, create a new overlap entry
          overlaps.push({
            overlapStartAt,
            overlapEndAt,
            // Initialize total weekly hours to 0, calculate later in Step 3
            totalWeeklyHours: 0,
          });
        }
      }
    }
  });

  // Step 3: Correctly Calculate Overlap Weekly Hours
  overlaps.forEach((overlap) => {
    overlap.totalWeeklyHours = sortedClasses
      .filter(
        (classItem) =>
          classItem.startAt < overlap.overlapEndAt &&
          classItem.endAt > overlap.overlapStartAt,
      )
      .reduce(
        (total, classItem) =>
          total + getWeeklyHours(classItem.weekdaysRange.id),
        0,
      );
  });

  return overlaps;
};
