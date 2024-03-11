import { ClientWeekdaysRange } from '@/types/_index';

export const WEEKDAYS_RANGES: ClientWeekdaysRange[] = [
  {
    id: 1,
    name: 'Mon - Fri',
    color: {
      primary: '#662d91',
      secondary: '#72519E',
    },
  },
  {
    id: 2,
    name: 'Mon - Wed',
    color: {
      primary: '#0047AB',
      secondary: '#365390',
    },
  },
  {
    id: 3,
    name: 'Wed - Fri',
    color: {
      primary: '#BA0021',
      secondary: '#BF3F4F',
    },
  },
] as const;
