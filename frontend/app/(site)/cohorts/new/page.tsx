import { CohortInfoForm } from '@/components/pages/cohorts/CohortInfoForm';
import { CohortScheduleTable } from '@/components/pages/cohorts/CohortScheduleTable';
import Headline from '@/components/partials/Headline';
import { Box } from '@mui/material';

const page = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="New Cohort" />
      </Box>
      <CohortInfoForm />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Schedule" />
      </Box>
      <CohortScheduleTable />
    </>
  );
};

export default page;
