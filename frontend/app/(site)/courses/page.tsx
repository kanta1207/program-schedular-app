import { getPrograms } from '@/actions/programs/getPrograms';
import CourseListTable from '@/components/pages/courses/CourseListTable';
import CreateCourse from '@/components/pages/courses/CreateCourse';
import Headline from '@/components/partials/Headline';

const CourseList = async () => {
  const { data: programs } = await getPrograms();
  return (
    <div className="w-full">
      <Headline name="Courses" />
      <CreateCourse programs={programs} />
      <CourseListTable programs={programs} />
    </div>
  );
};

export default CourseList;
