import { WEEKDAYS_RANGES } from '@/constants/weekdays-range';
import { WeekdaysRange } from '@/types/_index';
import { Box, Typography } from '@mui/material';

interface DaysOfTheWeekChipProps {
  daysOfTheWeek: WeekdaysRange;
  activeState?: 'active' | 'semiActive' | 'inactive';
}

export const DaysOfTheWeekChip: React.FC<DaysOfTheWeekChipProps> = ({ daysOfTheWeek, activeState = 'active' }) => {
  const color = WEEKDAYS_RANGES.find(({ id }) => id === daysOfTheWeek.id)?.color;

  const chipColor = () => {
    if (activeState === 'active') {
      return color?.primary;
    } else if (activeState === 'semiActive') {
      return color?.tertiary;
    } else if (activeState === 'inactive') {
      return 'grey.200';
    } else {
      return color?.primary;
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: chipColor(),
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
