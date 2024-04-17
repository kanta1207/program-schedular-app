import { getInstructors } from '@/actions/instructors/getInstructors';
import { getInstructorsWithHours } from '@/actions/instructors/getInstructorsWithHours';
import { InstructorsList } from '@/components/pages/instructors/InstructorsList';
import dayjs from 'dayjs';

const page = async () => {
  const { data: instructors } = await getInstructors({});
  const { data: instructorsWithHours } = await getInstructorsWithHours({ year: parseInt(dayjs().format('YYYY')) });
  return <InstructorsList instructors={instructors} instructorsWithHours={instructorsWithHours} />;
};

export default page;
