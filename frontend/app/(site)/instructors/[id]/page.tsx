import { getInstructorById } from '@/actions/instructors/getInstructorById';
import CreateInstructor from '@/components/pages/instructors/CreateInstructor';
import { InstructorScheduleTable } from '@/components/pages/instructors/InstructorScheduleTable';
import Headline from '@/components/partials/Headline';
import { Box, Button } from '@mui/material';

interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const instructor = await getInstructorById(id);

  return (
    <div className="w-full">
      <div>
        <Headline name="New Instructor" />
        <CreateInstructor pageType="view" instructor={instructor} />
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
        <Headline name={`${instructor?.name}'s Schedule:`} />
        <Button variant="contained">Edit Schedule</Button>
      </Box>
      <InstructorScheduleTable pageType="view" instructor={instructor} />
    </div>
  );
};

export default page;
