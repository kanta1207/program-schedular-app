import { Box } from '@mui/material';
import { getIntakes } from '@/actions/intakes/getIntakes';
import { getPrograms } from '@/actions/programs/getPrograms';
import { CohortInfoForm } from '@/components/pages/cohorts/CohortInfoForm';
import Headline from '@/components/partials/Headline';

const page = async () => {
  const [{ data: intakes }, { data: programs }] = await Promise.all([getIntakes(), getPrograms()]);
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="New Cohort" />
      </Box>
      <CohortInfoForm intakes={intakes} programs={programs} />
    </>
  );
};

export default page;
