/**
 * Checks if the provided date range is valid across existing data in database.
 *
 * @param {Date | undefined} newStartAt - The start date of the new range, or undefined if there is no start date.
 * @param {Date | undefined} newEndAt - The end date of the new range, or undefined if there is no end date.
 * @param {Date} existingStartAt - The start date of the existing range.
 * @param {Date} existingEndAt - The end date of the existing range.
 * @returns {boolean} - Returns true if the date range is valid, otherwise false.
 */
function checkDateOrder(
  newStartAt: Date | undefined,
  newEndAt: Date | undefined,
  existingStartAt: Date,
  existingEndAt: Date,
): boolean {
  if (!newStartAt && !newEndAt) return false;

  if (newStartAt && newEndAt) {
    return newStartAt.getTime() < newEndAt.getTime();
  }

  if (newStartAt) {
    return newStartAt.getTime() < existingEndAt.getTime();
  }

  if (newEndAt) {
    return existingStartAt.getTime() < newEndAt.getTime();
  }
}

export default checkDateOrder;
