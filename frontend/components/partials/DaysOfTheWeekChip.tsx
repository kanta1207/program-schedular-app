import { WeekdaysRangeName } from '@/types/master';

interface DaysOfTheWeekChipProps {
  daysOfTheWeek: WeekdaysRangeName;
}

export const DaysOfTheWeekChip: React.FC<DaysOfTheWeekChipProps> = ({ daysOfTheWeek }) => {
  let bgColor = '';
  if (daysOfTheWeek === 'Mon - Fri') {
    bgColor = 'bg-[#EDC16B]';
  } else if (daysOfTheWeek === 'Mon - Wed') {
    bgColor = 'bg-[#C299B2]';
  } else if (daysOfTheWeek === 'Wed - Fri') {
    bgColor = 'bg-[#6896B0]';
  }
  return (
    <span className={`${bgColor} text-white inline-block py-1 px-2 w-24 text-center rounded`}>{daysOfTheWeek}</span>
  );
};
