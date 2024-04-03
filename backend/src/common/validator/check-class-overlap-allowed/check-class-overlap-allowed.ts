import {
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../constants/master.constant';

/**
 * Check if the overlap is allowed case or not
 *
 * @param {number} rangeAId id of WeekdaysRange
 * @param {number} rangeBId id of WeekdaysRange
 * @return {boolean} true if the overlap is allowed
 */
export const checkClassOverlapAllowed = (
  rangeAId: number,
  rangeBId: number,
): boolean => {
  const allowedCombinations = [
    [MON_WED_WEEKDAYS_RANGE_ID, WED_FRI_WEEKDAYS_RANGE_ID],
    [WED_FRI_WEEKDAYS_RANGE_ID, MON_WED_WEEKDAYS_RANGE_ID],
  ];
  // Allow overlaps of [Mon-Wed, Wed-Fri] or [Wed-Fri, Mon-Wed]
  return allowedCombinations.some(([a, b]) => rangeAId === a && rangeBId === b);
};
