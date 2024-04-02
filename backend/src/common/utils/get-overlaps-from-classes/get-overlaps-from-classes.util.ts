import { Class } from 'src/entity';
import { getWeeklyHours } from '..';

export interface Overlap {
  startAt: Date;
  endAt: Date;
  totalWeeklyHours: number;
}

/**
 * function to handle new overlap, which is fully covered by existing overlap.
 * Called in {@link getOverlapsFromClasses}
 * @param existingOverlap - Existing overlap completely covering the new overlap
 * @param overlapStartAt - Start date of the new overlap
 * @param overlapEndAt - End date of the new overlap
 * @param overlaps - Array of overlaps
 */
const handleOverlapFullyCoveredByExistingOverlap = (
  existingOverlap: Overlap,
  overlapStartAt: Date,
  overlapEndAt: Date,
  overlaps: Overlap[],
) => {
  // If existing overlap completely covers the new overlap,
  // split the existing overlap into following 3 parts:
  // 1. Before the new overlap,
  // 2. The new overlap,
  // 3. After the new overlap
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
};

/**
 * function to handle new overlap, which is partially covered by existing overlap
 * Called in {@link getOverlapsFromClasses}
 * @param existingOverlap - Existing overlap not completely covering the new overlap
 * @param overlapStartAt - Start date of the new overlap
 * @param overlapEndAt - End date of the new overlap
 * @param overlaps - Array of overlaps
 */
const handleOverlapPartiallyCoveredByExistingOverlap = (
  existingOverlap: Overlap,
  overlapStartAt: Date,
  overlapEndAt: Date,
  overlaps: Overlap[],
) => {
  // If existing overlap doesn't completely cover the new overlap, Entry uncovered overlaps
  if (existingOverlap.startAt > overlapStartAt) {
    // - 1 the date to exclude the new overlap's start at date
    const endAt = new Date(existingOverlap.startAt);
    endAt.setUTCDate(endAt.getUTCDate() - 1);
    overlaps.push({
      startAt: overlapStartAt,
      endAt,
      // Initialize total weekly hours to 0, calculate later to avoid double counting
      totalWeeklyHours: 0,
    });
  } else if (existingOverlap.endAt < overlapEndAt) {
    // + 1 the date to exclude the new overlap's start at date
    const startAt = new Date(existingOverlap.endAt);
    startAt.setUTCDate(startAt.getUTCDate() + 1);

    overlaps.push({
      startAt,
      endAt: overlapEndAt,
      // Initialize total weekly hours to 0, calculate later to avoid double counting
      totalWeeklyHours: 0,
    });
  } else {
    // Update the existing overlap to include the new overlap
    existingOverlap.startAt = new Date(
      Math.max(existingOverlap.startAt.getTime(), overlapStartAt.getTime()),
    );
    existingOverlap.endAt = new Date(
      Math.min(existingOverlap.endAt.getTime(), overlapEndAt.getTime()),
    );
  }
};

/**
 * @param classes - Array of classes
 * @returns Array of {@link Overlap}
 */
export const getOverlapsFromClasses = (classes: Class[]): Overlap[] => {
  const overlaps: Overlap[] = [];

  // Find Overlaps and Group Overlapping Classes
  classes.forEach((currentClass, i) => {
    for (let j = i + 1; j < classes.length; j++) {
      const targetClass = classes[j];

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
          // Check if existing overlap completely covers the new overlap
          if (
            existingOverlap.startAt <= overlapStartAt &&
            existingOverlap.endAt >= overlapEndAt
          ) {
            handleOverlapFullyCoveredByExistingOverlap(
              existingOverlap,
              overlapStartAt,
              overlapEndAt,
              overlaps,
            );
          } else {
            handleOverlapPartiallyCoveredByExistingOverlap(
              existingOverlap,
              overlapStartAt,
              overlapEndAt,
              overlaps,
            );
          }
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
    overlap.totalWeeklyHours = classes
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

  return overlaps;
};
