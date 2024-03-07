import { getCohortById } from '@/actions/cohorts/getCohortById';
import { CohortInfoForm } from '@/components/pages/cohorts/CohortInfoForm';
import { CohortScheduleTable } from '@/components/pages/cohorts/CohortScheduleTable';
import Headline from '@/components/partials/Headline';
import { Box, Button } from '@mui/material';

interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const cohort = await getCohortById(id);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Cohorts" />
      </Box>
      <CohortInfoForm cohort={cohort} />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
          <Headline name={`Schedule: ${cohort?.name}`} />
          <Button variant="contained">Edit Schedule</Button>
        </Box>
        <CohortScheduleTable cohort={cohort} />
      </Box>
    </>
  );
};

export default page;
