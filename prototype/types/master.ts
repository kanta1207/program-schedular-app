export interface Classroom {
  id: number;
  name: classroomName;
  floor: floorName;
  createdAt?: Date;
  updatedAt?: Date;
}

export type classroomName =
  | "Google"
  | "Youtube"
  | "Uber"
  | "Amazon"
  | "Facebook"
  | "Apple"
  | "Hootsuite"
  | "Microsoft";

export type floorName = "2nd" | "3rd" | "4th";

export interface PeriodOfDay {
  id: number;
  name: PeriodOfDayName;
  time: TimeName;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PeriodOfDayName = "Morning" | "Afternoon" | "Evening";

export type TimeName = "8:30 - 12:30" | "1:00 - 5:00" | "5:30 - 9:30";

export interface ContractType {
  id: number;
  name: ContractName;
  maxHours?: number | null;
  minHours?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ContractName = "Full time" | "Part time" | "Contract";

export interface WeekdaysRange {
  id: number;
  name: WeekdaysRangeName;
  createdAt?: Date;
  updatedAt?: Date;
}

export type WeekdaysRangeName =
  | "Monday - Friday"
  | "Monday - Wednesday"
  | "Wednesday - Friday";
