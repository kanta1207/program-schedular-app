import { getInstructors } from '@/actions/instructors/getInstructors';
import { InstructorsList } from '@/components/pages/instructors/InstructorsList';

const page = async () => {
  const { data: instructors } = await getInstructors({});
  return <InstructorsList instructors={instructors} />;
};

export default page;
