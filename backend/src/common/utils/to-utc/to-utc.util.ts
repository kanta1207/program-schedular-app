/**
 *
 *
 * @param {Date} date of local timezone
 * @return {number}
 */
export const toUTC = (date: Date) => {
  return date.getTime() + date.getTimezoneOffset() * 60000;
};
