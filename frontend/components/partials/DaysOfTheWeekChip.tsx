import { WEEKDAYS_RANGES } from '@/constants/weekdays-range';
import { WeekdaysRange } from '@/types/_index';
import { Typography } from '@mui/material';

interface DaysOfTheWeekChipProps {
  daysOfTheWeek: WeekdaysRange;
}

export const DaysOfTheWeekChip: React.FC<DaysOfTheWeekChipProps> = ({ daysOfTheWeek }) => {
  const color = WEEKDAYS_RANGES.find(({ id }) => id === daysOfTheWeek.id)?.color;
  return (
    <>
      <Typography
        sx={{
          bgcolor: color?.primary,
          color: '#FFF',
          fontSize: '0.875rem',
          display: 'inline-block',
          width: '6rem',
          paddingInline: '0.5em',
          paddingBlock: '0.15em',
          textAlign: 'center',
          borderRadius: '0.25em',
        }}
      >
        {daysOfTheWeek.name}
      </Typography>
    </>
  );
};
