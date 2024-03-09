import Box from '@mui/material/Box';
import InstructorInfoForm from '@/components/pages/instructors/InstructorInfoForm';
import Headline from '@/components/partials/Headline';

const InstructorPage = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="New Instructor" />
      </Box>
      <InstructorInfoForm />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Schedule" />
      </Box>
    </>
  );
};

export default InstructorPage;
