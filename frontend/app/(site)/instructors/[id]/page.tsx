import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import InstructorInfoForm from '@/components/pages/instructors/InstructorInfoForm';
import { InstructorScheduleTable } from '@/components/pages/instructors/InstructorScheduleTable';
import Headline from '@/components/partials/Headline';
import { getInstructorById } from '@/actions/instructors/getInstructorById';
import { getCourses } from '@/actions/courses/getCourses';
import { getPrograms } from '@/actions/programs/getPrograms';

interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const [{ data: instructor }, { data: courses }, { data: programs }] = await Promise.all([
    getInstructorById(id),
    getCourses(),
    getPrograms(),
  ]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Instructor" />
      </Box>
      <InstructorInfoForm instructor={instructor} courses={courses} programs={programs} />
      <br />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
          <Headline name={`${instructor.name}'s Schedule`} />
          <ToggleButtonGroup color="primary" exclusive aria-label="Schedule Type">
            <ToggleButton value="list">List</ToggleButton>
            <ToggleButton value="gantt">Gantt</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <InstructorScheduleTable instructor={instructor} />
      </Box>
    </>
  );
};

export default page;
