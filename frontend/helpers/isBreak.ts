import { GetBreaksResponse } from '@/types/_index';
import dayjs from 'dayjs';

const isBreak = (date: Date, breaks: GetBreaksResponse[]) =>
  breaks.some(
    (breakItem) =>
      dayjs(breakItem.startAt).subtract(1, 'day').isBefore(date, 'day') &&
      dayjs(breakItem.endAt).add(1, 'day').isAfter(date, 'day'),
  );

export default isBreak;
