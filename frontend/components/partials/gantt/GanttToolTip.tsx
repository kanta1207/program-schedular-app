import Box from '@mui/material/Box';
import { PERIOD_OF_DAYS, WEEKDAYS_RANGES } from '@/constants/_index';

export const GanttToolTip = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem', fontSize: '14px' }} className=" max-w-max">
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '1rem' }}>
        {WEEKDAYS_RANGES.map((range) => {
          return (
            <Box key={range.id} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Box sx={{ width: '1rem', height: '1rem', borderRadius: '4px', backgroundColor: range.color.primary }} />
              {range.name}
            </Box>
          );
        })}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '4px' }}>
        {PERIOD_OF_DAYS.map((period) => (
          <Box key={period.id}>
            {period.icon} {period.name} ({period.time})
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GanttToolTip;
