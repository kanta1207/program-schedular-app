import * as dayjs from 'dayjs';
import { FormattedClass } from '../../../modules/cohorts/types';
import {
  WEEKDAYS_RANGE_MON_WED,
  WEEKDAYS_RANGE_WED_FRI,
} from '../../constants/master.constant';

// checkClassOverlap

/**
 * Check if there are any overlapped schedule in the given list of classes
 *
 * @param {FormattedClass[]} classes
 * @return {FormattedClass[]} List of FormattedClass with error messages
 */
export const checkClassOverlapAllowed = (
  classes: FormattedClass[],
): FormattedClass[] => {
  const checkOverlapAllowed = (rangeAId: number, rangeBId: number) => {
    const allowedCombinations = [
      [WEEKDAYS_RANGE_MON_WED.id, WEEKDAYS_RANGE_WED_FRI.id],
      [WEEKDAYS_RANGE_WED_FRI.id, WEEKDAYS_RANGE_MON_WED.id],
    ];
    // Allow overlaps of [Mon-Wed, Wed-Fri] or [Wed-Fri, Mon-Wed]
    return allowedCombinations.some(
      ([a, b]) => rangeAId === a && rangeBId === b,
    );
  };

  const generateMessage = (clazz: FormattedClass) => {
    const startAt = dayjs(clazz.startAt).format('YYYY-MM-DD');
    const endAt = dayjs(clazz.startAt).format('YYYY-MM-DD');
    const rangeName = clazz.weekdaysRange.data.name;

    return `Overlaps with ${startAt} - ${endAt}(${rangeName})`;
  };

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
