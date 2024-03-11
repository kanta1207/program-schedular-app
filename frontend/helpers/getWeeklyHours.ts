import { WEEKDAYS_RANGES } from '@/constants/weekdays-range';

const getWeeklyHours = (weekdaysRangeId: number) => {
  const weekdaysRange = WEEKDAYS_RANGES.find(({ id }) => id === weekdaysRangeId);
  if (!weekdaysRange) {
    return 0;
  }
  return weekdaysRange.name === 'Mon - Fri' ? 20 : 10;
};

export default getWeeklyHours;
