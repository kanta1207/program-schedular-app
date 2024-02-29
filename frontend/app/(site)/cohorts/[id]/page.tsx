import { CohortInfoForm } from '@/components/pages/cohorts/CohortInfoForm';
import { cohorts } from '@/mock/cohort';
import { Box, Typography } from '@mui/material';

interface PageProps {
  params: { id: string };
}

const page = ({ params }: PageProps) => {
  const { id } = params;
  const cohort = cohorts.find((cohort) => cohort.id === parseInt(id));

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Typography variant="h4">Cohort</Typography>
      </Box>
      <CohortInfoForm pageType={'view'} cohort={cohort} />

      <div>Cohort ID: {cohort?.name}</div>
    </>
  );
};

export default page;
