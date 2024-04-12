import { getBreaks } from '@/actions/breaks/getBreaks';
import { getCohortById } from '@/actions/cohorts/getCohortById';
import { getCohorts } from '@/actions/cohorts/getCohorts';
import { getHolidays } from '@/actions/common/getHolidays';
import { getCourses } from '@/actions/courses/getCourses';
import { getInstructors } from '@/actions/instructors/getInstructors';
import { getIntakes } from '@/actions/intakes/getIntakes';
import { getPrograms } from '@/actions/programs/getPrograms';
import { CohortInfoForm } from '@/components/pages/cohorts/CohortInfoForm';
import ScheduleSection from '@/components/pages/cohorts/ScheduleSection';
import Headline from '@/components/partials/Headline';
import { Box } from '@mui/material';

interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const [
    { data: cohort },
    { data: cohorts },
    { data: intakes },
    { data: programs },
    { data: courses },
    { data: instructors },
    { data: breaks },
    holidays,
  ] = await Promise.all([
    getCohortById(id),
    getCohorts(),
    getIntakes(),
    getPrograms(),
    getCourses(),
    getInstructors({}),
    getBreaks(),
    getHolidays(),
  ]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Cohorts" />
      </Box>
      <CohortInfoForm cohort={cohort} intakes={intakes} programs={programs} />
      <ScheduleSection
        cohort={cohort}
        courses={courses}
        instructors={instructors}
        cohorts={cohorts}
        breaks={breaks}
        holidays={holidays}
      />
    </>
  );
};

export default page;
