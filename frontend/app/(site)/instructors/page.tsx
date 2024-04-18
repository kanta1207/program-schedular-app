import { getInstructorsWithHours } from '@/actions/instructors/getInstructorsWithHours';
import { InstructorsList } from '@/components/pages/instructors/InstructorsList';
import dayjs from 'dayjs';

const page = async () => {
  const { data: instructorsWithHours } = await getInstructorsWithHours({ year: parseInt(dayjs().format('YYYY')) });
  return <InstructorsList instructorsWithHours={instructorsWithHours} />;
};

export default page;
