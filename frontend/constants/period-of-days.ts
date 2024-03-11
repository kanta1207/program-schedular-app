import { ClientPeriodOfDay } from '@/types/_index';

export const PERIOD_OF_DAYS: ClientPeriodOfDay[] = [
  {
    id: 1,
    name: 'Morning',
    time: '8:30 - 12:30',
    icon: '🌅',
  },
  {
    id: 2,
    name: 'Afternoon',
    time: '1:00 - 5:00',
    icon: '☀️',
  },
  {
    id: 3,
    name: 'Evening',
    time: '5:30 - 9:30',
    icon: '🌙',
  },
] as const;
