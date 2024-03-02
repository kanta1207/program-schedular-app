import dayjs from 'dayjs';
import { Break } from '@/types/_index';

export const breaks: Break[] = [
  {
    id: 1,
    startAt: dayjs('2023-06-26').toDate(),
    endAt: dayjs('2023-06-30').toDate(),
  },
  {
    id: 2,
    startAt: dayjs('2023-12-18').toDate(),
    endAt: dayjs('2023-12-29').toDate(),
  },
  {
    id: 3,
    startAt: dayjs('2024-03-25').toDate(),
    endAt: dayjs('2024-03-29').toDate(),
  },
  {
    id: 4,
    startAt: dayjs('2024-06-24').toDate(),
    endAt: dayjs('2024-06-28').toDate(),
  },
  {
    id: 5,
    startAt: dayjs('2024-08-26').toDate(),
    endAt: dayjs('2024-08-30').toDate(),
  },
];
