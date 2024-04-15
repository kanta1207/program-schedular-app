import dayjs from 'dayjs';
import getWeeklyHours from './getWeeklyHours';
import { GetBreaksResponse } from '@/types/_index';

const getPlannedHours = (startAt: Date, endAt: Date, weekdaysRangeId: number, breaks: GetBreaksResponse[]): number => {
  const startDate = dayjs(startAt);
  const endDate = dayjs(endAt);

  const totalBreakWeeks = breaks.reduce((accumulator, breakItem) => {
    const { startAt, endAt } = breakItem;
    const breakStartDate = dayjs(startAt);
    const breakEndDate = dayjs(endAt);

    if (startDate <= breakStartDate && breakEndDate <= endDate) {
      const daysDiff = breakEndDate.diff(breakStartDate, 'day');
      const breakWeeks = Math.ceil(daysDiff / 7);
      return accumulator + breakWeeks;
    }

    return accumulator;
  }, 0);

  const daysDiff = endDate.diff(startDate, 'day');
  const totalWeeks = Math.ceil(daysDiff / 7);

  const weeklyHours = getWeeklyHours(weekdaysRangeId);

  return (totalWeeks - totalBreakWeeks) * weeklyHours;
};

export default getPlannedHours;
