import { FormattedClass } from '../../../modules/cohorts/types';
import { checkClassOverlapAllowed } from '../check-class-overlap-allowed/check-class-overlap-allowed';

const errorMessage = 'This course is overlapping with another course.';

/**
 * Check if there are any overlapped schedule in the given list of classes
 *
 * @param {FormattedClass[]} classes
 * @return {FormattedClass[]} List of FormattedClass with error messages
 */
export const checkClassOverlap = (
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
        const isOverlapAllowed = checkClassOverlapAllowed(
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
