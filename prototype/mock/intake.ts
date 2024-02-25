import dayjs from 'dayjs';
import { Intake } from '@/types/_index';
import { cohorts } from './_index';

export const intakes: Intake[] = [
  {
    id: 1,
    name: '2023 August DMA',
    startAt: dayjs('2023-08-28').toDate(),
    endAt: dayjs('2024-02-23').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 1),
  },
  {
    id: 2,
    name: '2023 September DMS',
    startAt: dayjs('2023-09-25').toDate(),
    endAt: dayjs('2024-03-22').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 2),
  },
  {
    id: 3,
    name: '2023 November DMA',
    startAt: dayjs('2023-11-20').toDate(),
    endAt: dayjs('2024-05-24').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 3),
  },
  {
    id: 4,
    name: '2024 January DMS',
    startAt: dayjs('2024-01-02').toDate(),
    endAt: dayjs('2023-06-21').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 4),
  },
  {
    id: 5,
    name: '2023 March DMA',
    startAt: dayjs('2024-02-26').toDate(),
    endAt: dayjs('2024-08-23').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 5),
  },
];
