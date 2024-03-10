import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { getInstructorById } from '@/actions/instructors/getInstructorById';
import InstructorInfoForm from '@/components/pages/instructors/InstructorInfoForm';
import { InstructorScheduleTable } from '@/components/pages/instructors/InstructorScheduleTable';
import Headline from '@/components/partials/Headline';

interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const instructor = await getInstructorById(id);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Instructor" />
      </Box>
      <InstructorInfoForm instructor={instructor} />
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
