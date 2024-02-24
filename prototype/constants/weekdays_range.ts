import { WeekdaysRange } from "@/types/_index";

export const WEEKDAYS_RANGES: WeekdaysRange[] = [
  {
    id: 1,
    name: "Monday - Friday",
  },
  {
    id: 2,
    name: "Monday - Wednesday",
  },
  {
    id: 3,
    name: "Wednesday - Friday",
  },
] as const;
