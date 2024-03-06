import { getInstructors } from '@/actions/instructors/getInstructors';
import { InstructorListTable } from '@/components/pages/instructors/InstructorListTable';
import Headline from '@/components/partials/Headline';
import { Button } from '@mui/material';
import Link from 'next/link';

const page = async () => {
  const instructors = await getInstructors();
  return (
    <>
      <Headline name="Instructors" />
      <div className="flex justify-end mb-4 ">
        <Button href={'/instructors/new'} variant="contained">
          New Instructor
        </Button>
      </div>
      <InstructorListTable instructors={instructors} />
    </>
  );
};

export default page;
