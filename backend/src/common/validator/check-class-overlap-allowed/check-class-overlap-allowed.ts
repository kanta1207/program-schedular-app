import * as dayjs from 'dayjs';
import { FormattedClass } from '../../../modules/cohorts/types';
import {
  WEEKDAYS_RANGE_MON_WED,
  WEEKDAYS_RANGE_WED_FRI,
} from '../../constants/master.constant';

/**
 * Create error message from the Class instance
 * ex) 'Overlaps with 2024-03-01 - 2024-03-20(Mon - Wed)'
 *
 * @param {FormattedClass} clazz
 * @return {string}
 */
const generateMessage = (clazz: FormattedClass): string => {
  const startAt = dayjs(clazz.startAt).format('YYYY-MM-DD');
  const endAt = dayjs(clazz.startAt).format('YYYY-MM-DD');
  const rangeName = clazz.weekdaysRange.data.name;

  return `Overlaps with ${startAt} - ${endAt}(${rangeName})`;
};

/**
 * Check if the overlap is allowed case or not
 *
 * @param {number} rangeAId id of WeekdaysRange
 * @param {number} rangeBId id of WeekdaysRange
 * @return {boolean} true if the overlap is allowed
 */
const checkOverlapAllowed = (rangeAId: number, rangeBId: number): boolean => {
  const allowedCombinations = [
    [WEEKDAYS_RANGE_MON_WED.id, WEEKDAYS_RANGE_WED_FRI.id],
    [WEEKDAYS_RANGE_WED_FRI.id, WEEKDAYS_RANGE_MON_WED.id],
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
          classA.weekdaysRange.messages.push(generateMessage(classA));
          classB.weekdaysRange.messages.push(generateMessage(classB));
        }
      }
    }
  }

  return classes;
};
