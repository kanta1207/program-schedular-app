import dayjs from 'dayjs';

const calculateWeeksBetweenDates = (startDate: Date, endDate: Date) => {
  const daysDiff = dayjs(endDate).diff(dayjs(startDate), 'day');
  return Math.ceil(daysDiff / 7);
};

export default calculateWeeksBetweenDates;
