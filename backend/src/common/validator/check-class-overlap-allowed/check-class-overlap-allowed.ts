import { FormattedClass } from '../../../modules/cohorts/types';
import {
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../constants/master.constant';

const errorMessage = 'Overlapping with another class in the same cohort.';

/**
 * Check if the overlap is allowed case or not
 *
 * @param {number} rangeAId id of WeekdaysRange
 * @param {number} rangeBId id of WeekdaysRange
 * @return {boolean} true if the overlap is allowed
 */
const checkOverlapAllowed = (rangeAId: number, rangeBId: number): boolean => {
  const allowedCombinations = [
    [MON_WED_WEEKDAYS_RANGE_ID, WED_FRI_WEEKDAYS_RANGE_ID],
    [WED_FRI_WEEKDAYS_RANGE_ID, MON_WED_WEEKDAYS_RANGE_ID],
  ];
  // Allow overlaps of [Mon-Wed, Wed-Fri] or [Wed-Fri, Mon-Wed]
  return allowedCombinations.some(([a, b]) => rangeAId === a && rangeBId === b);
};

/**
 * Check if there are any overlapped schedule in the given list of classes
 *
 * @param {FormattedClass[]} classes
 * @return {FormattedClass[]} List of FormattedClass with error messages
 */
export const checkClassOverlapAllowed = (
  classes: FormattedClass[],
): FormattedClass[] => {
  // Compare each classes
  for (let i = 0; i < classes.length; i++) {
    for (let j = i + 1; j < classes.length; j++) {
      const classA = classes[i];
      const classB = classes[j];

      // Check duration
      if (classA.startAt <= classB.endAt && classA.endAt >= classB.startAt) {
        // Check if (Mon-Wed, Wed-Fri) or (Wed-Fri, Mon-Wed)
        const isOverlapAllowed = checkOverlapAllowed(
          classA.weekdaysRange.data.id,
          classB.weekdaysRange.data.id,
        );
        if (!isOverlapAllowed) {
          if (!classA.weekdaysRange.messages.length) {
            classA.weekdaysRange.messages.push(errorMessage);
          }
          if (!classB.weekdaysRange.messages.length) {
            classB.weekdaysRange.messages.push(errorMessage);
          }
        }
      }
    }
  }

  return classes;
};
