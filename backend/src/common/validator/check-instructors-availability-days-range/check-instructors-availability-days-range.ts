import { MON_FRI_WEEKDAYS_RANGE_ID } from '../../constants/master.constant';

export const checkInstructorsAvailabilityDaysRange = (
  instructorsWeekdaysRangeId: number,
  classWeekdaysRangeId: number,
): string | null => {
  if (instructorsWeekdaysRangeId === MON_FRI_WEEKDAYS_RANGE_ID) {
    return null;
  }
  const isAvailable = instructorsWeekdaysRangeId === classWeekdaysRangeId;
  if (!isAvailable) {
    return `Instructor is not available at this day range`;
  }
  return null;
};
