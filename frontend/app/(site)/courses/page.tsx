import { getCourses } from '@/actions/courses/getCourses';
import { getPrograms } from '@/actions/programs/getPrograms';
import CourseListTable from '@/components/pages/courses/CourseListTable';
import CreateCourse from '@/components/pages/courses/CreateCourse';
import Headline from '@/components/partials/Headline';

const CourseList = async () => {
  const [{ data: programs }, { data: courses }] = await Promise.all([getPrograms(), getCourses()]);
  return (
    <div className="w-full">
      <Headline name="Courses" />
      <CreateCourse programs={programs} />
      <CourseListTable courses={courses} programs={programs} />
    </div>
  );
};

export default CourseList;
