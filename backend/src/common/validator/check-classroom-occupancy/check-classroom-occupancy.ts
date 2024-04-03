import { FormattedClass } from 'src/modules/cohorts/types';
import { checkClassOverlapAllowed } from '../check-class-overlap-allowed/check-class-overlap-allowed';

const errorMessage = 'This classroom is used for other classes';

/**
 * Check if there are any conflicts of classroom
 *
 * @param {FormattedClass[]} classes
 * @return {FormattedClass[]} List of FormattedClass with error messages
 */
export const checkClassroomOccupancy = (
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
          if (classA.classroom.data.id === classB.classroom.data.id) {
            if (!classA.classroom.messages.length) {
              classA.classroom.messages.push(errorMessage);
            }
            if (!classB.classroom.messages.length) {
              classB.classroom.messages.push(errorMessage);
            }
          }
        }
      }
    }
  }

  return classes;
};
