import { Enrollment } from '@/types/_index'
import { cohorts } from './cohort'

export const enrollments: Enrollment[] = [
  {
    id: 1,
    name: '2023 August DMA',
    startDate: new Date('2023-09-23'),
    cohorts: [],
  },
  {
    id: 2,
    name: '2023 September DMS',
    startDate: new Date('2023-10-23'),
    cohorts: [],
  },
  {
    id: 3,
    name: '2023 November DMA',
    startDate: new Date('2023-12-23'),
    cohorts: [],
  },
  {
    id: 4,
    name: '2024 January DMS',
    startDate: new Date('2024-01-24'),
    cohorts: [],
  },
  {
    id: 5,
    name: '2023 March DMA',
    startDate: new Date('2024-03-24'),
    cohorts: [],
  },
]

enrollments.forEach((enrollment) => {
  cohorts.forEach((cohort) => {
    if (enrollment.id === cohort.enrollmentId) {
      enrollment.cohorts.push(cohort)
    }
  })
})
