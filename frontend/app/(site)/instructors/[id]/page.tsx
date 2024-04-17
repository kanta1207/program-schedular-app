import { Box } from '@mui/material';
import InstructorInfoForm from '@/components/pages/instructors/InstructorInfoForm';
import Headline from '@/components/partials/Headline';
import { getInstructorById } from '@/actions/instructors/getInstructorById';
import { getCourses } from '@/actions/courses/getCourses';
import { getPrograms } from '@/actions/programs/getPrograms';
import InstructorSchedule from '@/components/pages/instructors/InstructorSchedule';
import { getClasses } from '@/actions/classes/getClasses';
import { GetClassesGroupByCohort } from '@/types/_index';
import { convertClassesToGantt } from '@/helpers/convertClassesToGantt';
import { getCohorts } from '@/actions/cohorts/getCohorts';

interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const [{ data: instructor }, { data: courses }, { data: programs }, { data }, { data: fetchedCohorts }] =
    await Promise.all([
      getInstructorById(id),
      getCourses(),
      getPrograms(),
      getClasses({ groupBy: 'cohort', instructorId: [Number(id)] }),
      getCohorts(),
    ]);
  const cohorts = data as GetClassesGroupByCohort[];
  const ganttItems = convertClassesToGantt({ cohorts });

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Instructor" />
      </Box>
      <InstructorInfoForm instructor={instructor} courses={courses} programs={programs} />
      <Box sx={{ height: '4rem' }} />
      <InstructorSchedule instructor={instructor} ganttItems={ganttItems} cohorts={fetchedCohorts} />
    </>
  );
};

export default page;
