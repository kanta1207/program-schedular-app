import { ContractType } from '@/types/_index'

export const CONTRACTS: ContractType[] = [
  {
    id: 1,
    name: 'Employee(full-time)',
    maxHours: 40,
    minHours: 30,
  },
  {
    id: 2,
    name: 'Contract(full-time)',
    maxHours: 40,
    minHours: 10,
  },
  {
    id: 3,
    name: 'Contract(part-time)',
    maxHours: 20,
    minHours: 10,
  },
] as const
