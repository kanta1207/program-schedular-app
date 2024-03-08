export interface Classroom {
  id: number;
  name: ClassroomName;
  floor: FloorName;
}

export type ClassroomName = 'Google' | 'Youtube' | 'Uber' | 'Amazon' | 'Facebook' | 'Apple' | 'Hootsuite' | 'Microsoft';

export type FloorName = '2nd' | '3rd' | '4th';

export interface PeriodOfDay {
  id: number;
  name: PeriodOfDayName;
  time: TimeName;
}

export type PeriodOfDayName = 'Morning' | 'Afternoon' | 'Evening';

export type TimeName = '8:30 - 12:30' | '1:00 - 5:00' | '5:30 - 9:30';

export interface ContractType {
  id: number;
  name: ContractName;
}

export type ContractName = 'Full time' | 'Part time' | 'Contract';

export interface WeekdaysRange {
  id: number;
  name: WeekdaysRangeName;
}

export type WeekdaysRangeName = 'Mon - Fri' | 'Mon - Wed' | 'Wed - Fri';
