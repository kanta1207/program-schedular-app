import { WeekdaysRange } from '@/types/_index';

export const WEEKDAYS_RANGES: WeekdaysRange[] = [
  {
    id: 1,
    name: 'Mon - Fri',
  },
  {
    id: 2,
    name: 'Mon - Wed',
  },
  {
    id: 3,
    name: 'Wed - Fri',
  },
] as const;
