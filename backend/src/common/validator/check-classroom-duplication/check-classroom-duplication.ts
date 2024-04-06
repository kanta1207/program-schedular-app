import { FormattedClass } from '../../../modules/cohorts/types';
import { checkClassOverlapAllowed } from '../check-class-overlap-allowed/check-class-overlap-allowed';
import { Class } from '../../../entity';

const errorMessage = 'This classroom is used for other classes';

/**
 * Checks if there is any classroom duplication among the given formatted classes
 * and the classes within the specified period.
 *
 * @param {FormattedClass[]} formattedClasses - The list of classes to check for duplication.
 * @param {Class[]} classesWithinPeriod - The list of existing classes within the specified period.
 * @return {FormattedClass[]} The modified list of formatted classes with error messages added if duplication is found.
 */
export const checkClassroomDuplication = (
  formattedClasses: FormattedClass[],
  classesWithinPeriod: Class[],
): FormattedClass[] => {
  for (const formattedClass of formattedClasses) {
    for (const existingClass of classesWithinPeriod) {
      if (formattedClass.classroom.data.id === existingClass.classroom.id) {
        const periodsOverlap =
          formattedClass.startAt <= existingClass.endAt &&
          formattedClass.endAt >= existingClass.startAt;

        if (periodsOverlap) {
          let overlapAllowed = false;
          if (formattedClass.cohort.id === existingClass.cohort.id) {
            overlapAllowed = checkClassOverlapAllowed(
              formattedClass.weekdaysRange.data.id,
              existingClass.weekdaysRange.id,
            );
          }

          if (!overlapAllowed) {
            if (!formattedClass.classroom.messages.includes(errorMessage)) {
              formattedClass.classroom.messages.push(errorMessage);
            }
          }
        }
      }
    }
  }

  return formattedClasses;
};
