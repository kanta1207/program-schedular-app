export const addHours = (date: Date, hours = 8): Date => {
  const offset = hours * 60;
  return new Date(date.getTime() + offset * 60000);
};
