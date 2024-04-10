import { WEEKDAYS_RANGES } from '@/constants/weekdays-range';
import { WeekdaysRange } from '@/types/_index';
import { Typography } from '@mui/material';

interface DaysOfTheWeekChipProps {
  daysOfTheWeek: WeekdaysRange;
  activeState?: 'active' | 'semiActive' | 'inActive';
}

export const DaysOfTheWeekChip: React.FC<DaysOfTheWeekChipProps> = ({ daysOfTheWeek, activeState = 'active' }) => {
  const color = WEEKDAYS_RANGES.find(({ id }) => id === daysOfTheWeek.id)?.color;

  const chipColor = () => {
    if (activeState === 'active') {
      return color?.primary;
    } else if (activeState === 'semiActive') {
      return color?.tertiary;
    } else {
      return 'grey.200';
    }
  };

  return (
    <>
      <Typography
        sx={{
          bgcolor: chipColor(),
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
