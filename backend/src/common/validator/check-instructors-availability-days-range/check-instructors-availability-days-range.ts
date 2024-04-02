import { MON_FRI_WEEKDAYS_RANGE_ID } from '../../constants/master.constant';

export const checkInstructorsAvailabilityDaysRange = (
  instructorsWeekdaysRangeId: number,
  classWeekdaysRangeId: number,
): string | null => {
  // TODO:
  // dont forget to change this logic when you add saturday and sunday (weekends included)
  // because this logic using directly the constant. it matches the ids.

  if (instructorsWeekdaysRangeId === MON_FRI_WEEKDAYS_RANGE_ID) {
    return null;
  }
  const isAvailable = instructorsWeekdaysRangeId === classWeekdaysRangeId;
  if (!isAvailable) {
    return `Instructor is not available at this day range`;
  }
  return null;
};
