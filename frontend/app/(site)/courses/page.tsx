import CourseListTable from '@/components/pages/courses/CourseListTable';
import CreateCourse from '@/components/pages/courses/CreateCourse';
import Headline from '@/components/partials/Headline';

const CourseList = () => {
  return (
    <div className="w-full">
      <Headline name="Courses" />
      <CreateCourse />
      <CourseListTable />
    </div>
  );
};

export default CourseList;
