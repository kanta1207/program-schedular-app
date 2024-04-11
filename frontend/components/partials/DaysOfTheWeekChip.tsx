import { WEEKDAYS_RANGES } from '@/constants/weekdays-range';
import { WeekdaysRange } from '@/types/_index';
import { Box } from '@mui/material';

interface DaysOfTheWeekChipProps {
  daysOfTheWeek: WeekdaysRange;
}

export const DaysOfTheWeekChip: React.FC<DaysOfTheWeekChipProps> = ({ daysOfTheWeek }) => {
  const color = WEEKDAYS_RANGES.find(({ id }) => id === daysOfTheWeek.id)?.color;
  return (
    <>
      <Box
        sx={{
          bgcolor: color?.primary,
          color: '#FFF',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '6rem',
          padding: '0.5em 0.15em',
          borderRadius: '0.25em',
        }}
      >
        <span>{daysOfTheWeek.name}</span>
      </Box>
    </>
  );
};
