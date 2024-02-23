import { Cohort } from './cohort'

export interface Enrollment {
  id: number
  startDate: Date
  name: string
  cohorts: Cohort[]
  createdAt?: Date
  updatedAt?: Date
}
