import CreateInstructor from '@/components/pages/instructors/CreateInstructor';
import Headline from '@/components/partials/Headline';

const InstructorPage = () => {
  return (
    <div className="w-full">
      <Headline name="New Instructor" />
      <CreateInstructor />
    </div>
  );
};

export default InstructorPage;
