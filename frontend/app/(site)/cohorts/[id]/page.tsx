import { getCohortById } from '@/actions/cohorts/getCohortById';
import { getIntakes } from '@/actions/intakes/getIntakes';
import { getPrograms } from '@/actions/programs/getPrograms';
import { CohortInfoForm } from '@/components/pages/cohorts/CohortInfoForm';
import CohortSchedule from '@/components/pages/cohorts/CohortSchedule';
import Headline from '@/components/partials/Headline';
import { Box } from '@mui/material';

interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const [{ data: cohort }, { data: intakes }, { data: programs }] = await Promise.all([
    getCohortById(id),
    getIntakes(),
    getPrograms(),
  ]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Cohorts" />
      </Box>
      <CohortInfoForm cohort={cohort} intakes={intakes} programs={programs} />
      <CohortSchedule cohort={cohort} />
    </>
  );
};

export default page;
