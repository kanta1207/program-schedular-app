import { Program } from './_index'

export interface Course {
  id: number
  name: string
  requiredHours: number
  program: Program
  createdAt?: Date
  updatedAt?: Date
}
