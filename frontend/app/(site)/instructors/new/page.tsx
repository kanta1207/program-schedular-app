import Box from '@mui/material/Box';
import InstructorInfoForm from '@/components/pages/instructors/InstructorInfoForm';
import Headline from '@/components/partials/Headline';
import { getCourses } from '@/actions/courses/getCourses';
import { getPrograms } from '@/actions/programs/getPrograms';

const InstructorPage = async () => {
  const [{ data: courses }, { data: programs }] = await Promise.all([getCourses(), getPrograms()]);
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="New Instructor" />
      </Box>
      <InstructorInfoForm courses={courses} programs={programs} />
    </>
  );
};

export default InstructorPage;
