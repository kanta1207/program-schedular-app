export interface Slot {
  id: number
  startAt: Date
  endAt: Date
  isBreak: boolean
  scheduleId: number
  classId: number | null
  createdAt?: Date
  updatedAt?: Date
}
