import dayjs from 'dayjs'
import { Intake } from '@/types/_index'
import { cohorts } from './_index'

export const intakes: Intake[] = [
  {
    id: 1,
    name: '2023 August DMA',
    startDate: dayjs('2023-08-28').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 1),
  },
  {
    id: 2,
    name: '2023 September DMS',
    startDate: dayjs('2023-09-25').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 2),
  },
  {
    id: 3,
    name: '2023 November DMA',
    startDate: dayjs('2023-11-20').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 3),
  },
  {
    id: 4,
    name: '2024 January DMS',
    startDate: dayjs('2024-01-02').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 4),
  },
  {
    id: 5,
    name: '2023 March DMA',
    startDate: dayjs('2024-02-26').toDate(),
    cohorts: cohorts.filter(({ intake: { id } }) => id === 5),
  },
]
