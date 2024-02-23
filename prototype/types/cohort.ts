export interface Cohort {
  id: number
  name: string
  enrollmentId: number
  periodOfDayId: number
  programId: number
  scheduleId: number
  createdAt?: Date
  updatedAt?: Date
}
