import CreateCourse from '@/components/pages/courses/CreateCourse';
import CourseTableList from '@/components/pages/courses/CourseTableList';
import Headline from '@/components/partials/Headline';

const CourseList = () => {
  return (
    <div className="w-full">
      <Headline name="Courses" />
      <CreateCourse />
      <CourseTableList />
    </div>
  );
};

export default CourseList;
