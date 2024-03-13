import { getCohortById } from '@/actions/cohorts/getCohortById';
import { getCourses } from '@/actions/courses/getCourses';
import { getInstructors } from '@/actions/instructors/getInstructors';
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
  const [{ data: cohort }, { data: intakes }, { data: programs }, { data: courses }, { data: instructors }] =
    await Promise.all([getCohortById(id), getIntakes(), getPrograms(), getCourses(), getInstructors({})]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Cohorts" />
      </Box>
      <CohortInfoForm cohort={cohort} intakes={intakes} programs={programs} />
      <CohortSchedule cohort={cohort} courses={courses} instructors={instructors} />
    </>
  );
};

export default page;
