import { GetBreaksResponse } from '@/types/_index';
import dayjs from 'dayjs';

const getBreaksBetweenDates = (breaks: GetBreaksResponse[], startDate: Date, endDate: Date) => {
  return breaks.filter(
    (breakItem) =>
      dayjs(breakItem.startAt).isAfter(dayjs(startDate)) && dayjs(breakItem.endAt).isBefore(dayjs(endDate)),
  );
};

export default getBreaksBetweenDates;
