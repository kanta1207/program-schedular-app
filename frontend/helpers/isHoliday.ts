import { Holiday } from '@/types/_index';
import dayjs from 'dayjs';

const isHoliday = (date: Date, holidays: Holiday[] | undefined) => {
  if (!holidays || holidays.length === 0) return false;
  return holidays.some((holiday) => dayjs(holiday.date).isSame(date));
};

export default isHoliday;
