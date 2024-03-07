import { getInstructorById } from '@/actions/instructors/getInstructorById';
import CreateInstructor from '@/components/pages/instructors/CreateInstructor';
import { InstructorScheduleTable } from '@/components/pages/instructors/InstructorScheduleTable';
import Headline from '@/components/partials/Headline';
import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

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
        <Headline name={`${instructor.name}'s Schedule:`} />
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button variant="contained">List</Button>
          <Button variant="contained">Gantt</Button>
        </Box>

        <ToggleButtonGroup color="primary" exclusive aria-label="Schedule Type">
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="gantt">Gantt</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <InstructorScheduleTable instructor={instructor} />
    </div>
  );
};

export default page;
