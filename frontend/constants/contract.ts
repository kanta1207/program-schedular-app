import { ContractType } from '@/types/_index';

export const CONTRACT_TYPES: ContractType[] = [
  {
    id: 1,
    name: 'Full time',
  },
  {
    id: 2,
    name: 'Part time',
  },
  {
    id: 3,
    name: 'Contract',
  },
] as const;
