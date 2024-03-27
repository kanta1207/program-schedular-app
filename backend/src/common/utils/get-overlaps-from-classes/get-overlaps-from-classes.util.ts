import { Class } from 'src/entity';
import { getWeeklyHours } from '..'; // Adjust the import path as necessary

export interface Overlap {
  startAt: Date;
  endAt: Date;
  totalWeeklyHours: number;
}

/**
 * @param classes - Array of classes
 * @returns Array of {@link Overlap}
 */
export const getOverlapsFromClasses = (classes: Class[]): Overlap[] => {
  // Sort Classes by Start Time
  const sortedClasses = classes.sort(
    (a, b) => a.startAt.getTime() - b.startAt.getTime(),
  );

  const overlaps: Overlap[] = [];

  // Find Overlaps and Group Overlapping Classes
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
          (o) => o.startAt <= overlapEndAt && o.endAt >= overlapStartAt,
        );

        if (existingOverlap) {
          // If existing overlap completely covers the new overlap,
          // split the existing overlap into following 3 parts:
          // 1. Before the new overlap,
          // 2. The new overlap,
          // 3. After the new overlap
          if (
            existingOverlap.startAt <= overlapStartAt &&
            existingOverlap.endAt >= overlapEndAt
          ) {
            if (existingOverlap.startAt < overlapStartAt) {
              // - 1 the date to exclude the new overlap's start at date);
              const endAt = new Date(overlapStartAt);
              endAt.setUTCDate(endAt.getUTCDate() - 1);

              overlaps.push({
                startAt: existingOverlap.startAt,
                endAt,
                // Initialize total weekly hours to 0, calculate later to avoid double counting
                totalWeeklyHours: 0,
              });
            }
            if (existingOverlap.endAt > overlapEndAt) {
              // + 1 the date to exclude the new overlap's start at date
              const startAt = new Date(overlapEndAt);
              startAt.setUTCDate(startAt.getUTCDate() + 1);

              overlaps.push({
                startAt,
                endAt: existingOverlap.endAt,
                // Initialize total weekly hours to 0, calculate later to avoid double counting
                totalWeeklyHours: 0,
              });
            }
            // Update the existing overlap to the new overlap
            existingOverlap.startAt = overlapStartAt;
            existingOverlap.endAt = overlapEndAt;
          } else {
            // If existing overlap doesn't completely cover the new overlap, Entry uncovered overlaps
            if (existingOverlap.startAt > overlapStartAt) {
              overlaps.push({
                startAt: overlapStartAt,
                endAt: existingOverlap.startAt,
                // Initialize total weekly hours to 0, calculate later to avoid double counting
                totalWeeklyHours: 0,
              });
            }
            if (existingOverlap.endAt < overlapEndAt) {
              overlaps.push({
                startAt: existingOverlap.endAt,
                endAt: overlapEndAt,
                // Initialize total weekly hours to 0, calculate later to avoid double counting
                totalWeeklyHours: 0,
              });
            }
          }

          existingOverlap.startAt = new Date(
            Math.max(
              existingOverlap.startAt.getTime(),
              overlapStartAt.getTime(),
            ),
          );
          existingOverlap.endAt = new Date(
            Math.min(existingOverlap.endAt.getTime(), overlapEndAt.getTime()),
          );
        } else {
          // If no existing group, create a new overlap entry
          overlaps.push({
            startAt: overlapStartAt,
            endAt: overlapEndAt,
            // Initialize total weekly hours to 0, calculate later to avoid double counting
            totalWeeklyHours: 0,
          });
        }
      }
    }
  });

  // Calculate Overlap Weekly Hours
  overlaps.forEach((overlap) => {
    overlap.totalWeeklyHours = sortedClasses
      .filter(
        (classItem) =>
          classItem.startAt < overlap.endAt &&
          classItem.endAt > overlap.startAt,
      )
      .reduce(
        (total, classItem) =>
          total + getWeeklyHours(classItem.weekdaysRange.id),
        0,
      );
  });

  // Sort Overlaps by Start Time to maintain order
  const sortedOverlaps = overlaps.sort(
    (a, b) => a.startAt.getTime() - b.startAt.getTime(),
  );

  return sortedOverlaps;
  // return overlaps;
};
