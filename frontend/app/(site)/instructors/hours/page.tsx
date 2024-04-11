import { getInstructorsWithHours } from '@/actions/instructors/getInstructorsWithHours';
import { InstructorWithHoursListTable } from '@/components/pages/instructors/InstructorWithHoursListTable';
import Headline from '@/components/partials/Headline';
import { Button } from '@mui/material';
const page = async () => {
  const { data: instructors } = await getInstructorsWithHours({});

  return (
    <>
      <Headline name="Instructors" />
      <div className="flex justify-end mb-4 ">
        <Button href={'/instructors/new'} variant="contained">
          New Instructor
        </Button>
      </div>
      <InstructorWithHoursListTable instructors={instructors} />
    </>
  );
};

export default page;
