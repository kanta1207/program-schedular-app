import { ClientWeekdaysRange } from '@/types/_index';

export const WEEKDAYS_RANGES: ClientWeekdaysRange[] = [
  {
    id: 1,
    name: 'Mon - Fri',
    color: {
      primary: '#662d91',
      secondary: '#72519E',
      tertiary: '#662d9180',
    },
  },
  {
    id: 2,
    name: 'Mon - Wed',
    color: {
      primary: '#0047AB',
      secondary: '#365390',
      tertiary: '#0047AB80',
    },
  },
  {
    id: 3,
    name: 'Wed - Fri',
    color: {
      primary: '#BA0021',
      secondary: '#BF3F4F',
      tertiary: '#BA002180',
    },
  },
] as const;
