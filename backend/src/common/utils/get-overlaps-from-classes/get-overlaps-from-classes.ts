import { Class } from 'src/entity';
import { getWeeklyHours } from '../';

export const getOverlapsFromClasses = (classes: Class[]) => {
  // Sort all classes by their start date
  const sortedClasses = classes.sort(
    (a, b) => a.startAt.getTime() - b.startAt.getTime(),
  );

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
        break;
      }
    }

    // If no overlapping group is found, create a new one
    if (!found) {
      overlaps.push({
        overlapStartAt: currentClass.startAt,
        overlapEndAt: currentClass.endAt,
        totalWeeklyHours: weeklyHoursOfCurrentClass,
      });
    }
  });

  return overlaps;
};
