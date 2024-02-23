export interface Classroom {
  id: number
  name: classroomName
  floor: floorName
  createdAt?: Date
  updatedAt?: Date
}

export type classroomName = 'Youtube' | 'Facebook' | 'Amazon' | 'Apple' | 'Hootsuite' | 'Microsoft'

export type floorName = '2nd floor' | '3rd floor' | '4th floor'

export interface PeriodOfDay {
  id: number
  name: PeriodOfDayName
  createdAt?: Date
  updatedAt?: Date
}

export type PeriodOfDayName = 'Morning' | 'Afternoon' | 'Evening'

export interface ContractType {
  id: number
  name: ContractName
  maxHours?: number
  minHours?: number
  createdAt?: Date
  updatedAt?: Date
}

export type ContractName = 'Employee(full-time)' | 'Contract(full-time)' | 'Contract(part-time)'

export interface WeekdaysRange {
  id: number
  name: WeekdaysRangeName
  createdAt?: Date
  updatedAt?: Date
}

export type WeekdaysRangeName = 'Monday-Friday' | 'Monday-Wednesday' | 'Wednesday-Friday'
