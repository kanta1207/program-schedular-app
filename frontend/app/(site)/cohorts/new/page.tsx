import { CohortInfoForm } from '@/components/pages/cohorts/CohortInfoForm';
import { CohortScheduleTable } from '@/components/pages/cohorts/CohortScheduleTable';
import { Box, Typography } from '@mui/material';

const page = () => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Typography variant="h4">New Cohort</Typography>
      </Box>
      <CohortInfoForm pageType={'new'} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Typography variant="h4">Schedule</Typography>
      </Box>
      <CohortScheduleTable pageType={'new'} />
    </>
  );
};

export default page;
