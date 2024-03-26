import {
  MON_FRI_WEEKDAYS_RANGE_ID,
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../constants/master.constant';

// TODO: When "SAT-SUN" weekdays range is added, we might need to update this function
export const getWeeklyHours = (weekdaysRangeId: number) => {
  if (weekdaysRangeId === MON_FRI_WEEKDAYS_RANGE_ID) return 20;

  if (
    weekdaysRangeId === MON_WED_WEEKDAYS_RANGE_ID ||
    weekdaysRangeId === WED_FRI_WEEKDAYS_RANGE_ID
  )
    return 10;

  throw new Error('Invalid weekdays range ID');
};
