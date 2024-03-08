import { WeekdaysRangeName } from '@/types/master';
import { Typography } from '@mui/material';

interface DaysOfTheWeekChipProps {
  daysOfTheWeek: WeekdaysRangeName;
}

export const DaysOfTheWeekChip: React.FC<DaysOfTheWeekChipProps> = ({ daysOfTheWeek }) => {
  const daysOfWeekColorName = daysOfTheWeek.toLowerCase().replace(/[\s-]/g, '');

  return (
    <>
      <Typography
        sx={{
          bgcolor: `daysOfWeek.${daysOfWeekColorName}`,
          color: '#FFF',
          fontSize: '0.875rem',
          display: 'inline-block',
          width: '6rem',
          paddingInline: '0.5em',
          paddingBlock: '0.25em',
          textAlign: 'center',
          borderRadius: '0.25em',
        }}
      >
        {daysOfTheWeek}
      </Typography>
    </>
  );
};
