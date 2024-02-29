import { CohortInfoForm } from '@/components/pages/cohorts/CohortInfoForm';
import { CohortScheduleTable } from '@/components/pages/cohorts/CohortScheduleTable';
import Headline from '@/components/partials/Headline';
import { Box, Typography } from '@mui/material';

const page = () => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="New Cohort" />
      </Box>
      <CohortInfoForm pageType="new" />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Typography variant="h4">Schedule</Typography>
      </Box>
      <CohortScheduleTable pageType={'new'} />
    </>
  );
};

export default page;
