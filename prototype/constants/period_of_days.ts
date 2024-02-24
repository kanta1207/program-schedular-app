import { PeriodOfDay } from "@/types/_index";

export const PERIOD_OF_DAYS: PeriodOfDay[] = [
  {
    id: 1,
    name: "Morning",
    time: "8:30 - 12:30",
  },
  {
    id: 2,
    name: "Afternoon",
    time: "1:00 - 5:00",
  },
  {
    id: 3,
    name: "Evening",
    time: "5:30 - 9:30",
  },
] as const;
