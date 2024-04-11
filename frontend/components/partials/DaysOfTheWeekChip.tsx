import { WEEKDAYS_RANGES } from '@/constants/weekdays-range';
import { WeekdaysRange } from '@/types/_index';
import { Box, Typography } from '@mui/material';

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '6rem',
          padding: '0.5em 0.15em',
          borderRadius: '0.25em',
        }}
      >
        <Typography sx={{ fontSize: '0.875rem', color: '#FFF' }}>{daysOfTheWeek.name}</Typography>
      </Box>
    </>
  );
};
