import CreateCourse from '@/components/pages/courses/CreateCourse';
import CourseTableList from '@/components/pages/courses/CourseTableList';
const CourseList = () => {
  return (
    <div className="w-full p-20">
      <CreateCourse />
      <CourseTableList />
    </div>
  );
};

export default CourseList;
