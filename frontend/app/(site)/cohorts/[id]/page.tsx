import { CohortInfoForm } from '@/components/pages/cohorts/CohortInfoForm';
import { CohortScheduleTable } from '@/components/pages/cohorts/CohortScheduleTable';
import Headline from '@/components/partials/Headline';
import { cohorts } from '@/mock/cohort';
import { Box, Button, Typography } from '@mui/material';

interface PageProps {
  params: { id: string };
}

const page = ({ params }: PageProps) => {
  const { id } = params;
  const cohort = cohorts.find((cohort) => cohort.id === parseInt(id));

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Cohorts" />
      </Box>
      <CohortInfoForm pageType={'view'} cohort={cohort} />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
          <Typography
            variant="h4"
            color="primary.main"
            fontWeight={500}
            letterSpacing={0.25}
          >{`Schedule: ${cohort?.name}`}</Typography>
          <Button variant="contained">Edit Schedule</Button>
        </Box>
        <CohortScheduleTable pageType="view" cohort={cohort} />
      </Box>
    </>
  );
};

export default page;
