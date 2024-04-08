import { checkClassOverlapAllowed } from '../check-class-overlap-allowed/check-class-overlap-allowed';

const errorMessage = 'This classroom is used for other classes';

/**
 * Check classroom duplication
 *
 * @param {number} cohortClassId
 * @param {number} cohortClassClassroomId
 * @param {Date} cohortClassStartAt
 * @param {Date} cohortClassEndAt
 * @param {number} cohortClassWeekdaysRangeId
 * @param {number} classroomClassId
 * @param {number} classroomClassClassroomId
 * @param {Date} classroomClassStartAt
 * @param {Date} classroomClassEndAt
 * @param {number} classroomClassWeekdaysRangeId
 * @return {(string | void)}
 */
export const checkClassroomDuplication = (
  cohortClassId: number,
  cohortClassClassroomId: number,
  cohortClassStartAt: Date,
  cohortClassEndAt: Date,
  cohortClassWeekdaysRangeId: number,
  classroomClassId: number,
  classroomClassClassroomId: number,
  classroomClassStartAt: Date,
  classroomClassEndAt: Date,
  classroomClassWeekdaysRangeId: number,
): string | void => {
  if (cohortClassId === classroomClassId) return;
  if (cohortClassClassroomId !== classroomClassClassroomId) return;

  const periodsOverlap =
    cohortClassStartAt <= classroomClassEndAt &&
    cohortClassEndAt >= classroomClassStartAt;
  if (!periodsOverlap) return;

  if (
    !checkClassOverlapAllowed(
      cohortClassWeekdaysRangeId,
      classroomClassWeekdaysRangeId,
    )
  ) {
    return errorMessage;
  }
};
