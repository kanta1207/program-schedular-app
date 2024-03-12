import Box from '@mui/material/Box';
import InstructorInfoForm from '@/components/pages/instructors/InstructorInfoForm';
import Headline from '@/components/partials/Headline';
import { getCourses } from '@/actions/courses/getCourses';

const InstructorPage = async () => {
  const { data: courses } = await getCourses();
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="New Instructor" />
      </Box>
      <InstructorInfoForm courses={courses} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Schedule" />
      </Box>
    </>
  );
};

export default InstructorPage;
