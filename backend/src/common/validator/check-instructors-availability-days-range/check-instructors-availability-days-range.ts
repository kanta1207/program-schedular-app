import { MON_FRI_WEEKDAYS_RANGE_ID } from '../../constants/master.constant';

export const checkInstructorsAvailabilityDaysRange = (
  instructorsWeekdaysRangeId: number,
  classWeekdaysRangeId: number,
  classWeekdaysRangeName: string,
): string | null => {
  // TODO: When SAT-SUN weekdays range is added, refactor this logic
  if (instructorsWeekdaysRangeId === MON_FRI_WEEKDAYS_RANGE_ID) {
    return null;
  }

  const isAvailable = instructorsWeekdaysRangeId === classWeekdaysRangeId;
  if (!isAvailable) {
    return `Unavailable for ${classWeekdaysRangeName}.`;
  }
  return null;
};
