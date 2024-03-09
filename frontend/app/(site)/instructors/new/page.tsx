import CreateInstructor from '@/components/pages/instructors/InstructorInfoForm';
import Headline from '@/components/partials/Headline';

const InstructorPage = () => {
  return (
    <div className="w-full">
      <Headline name="New Instructor" />
      <CreateInstructor pageType={'new'} />
    </div>
  );
};

export default InstructorPage;
