import { ContractType } from '@/types/_index';

export const CONTRACT_TYPES: ContractType[] = [
  {
    id: 1,
    name: 'Full time',
    maxHours: 40,
    minHours: 30,
  },
  {
    id: 2,
    name: 'Part time',
    maxHours: 20,
    minHours: 10,
  },
  {
    id: 3,
    name: 'Contract',
    maxHours: null,
    minHours: null,
  },
] as const;
