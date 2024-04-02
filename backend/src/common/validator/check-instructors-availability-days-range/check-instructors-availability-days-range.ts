import { MasterWeekdaysRange } from 'src/entity';

export const checkInstructorsAvailabilityDaysRange = (
  instructorsWeekdaysRangeId: number,
  classWeekdaysRangeId: number,
): string | null => {
  const isAvailable = instructorsWeekdaysRangeId === classWeekdaysRangeId;
  if (!isAvailable) {
    return `Instructor is not available at this day range`;
  }
  return null;
};
