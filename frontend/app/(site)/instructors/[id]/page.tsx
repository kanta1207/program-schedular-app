import { getInstructorById } from '@/actions/instructors/getInstructorById';
import CreateInstructor from '@/components/pages/instructors/CreateInstructor';
import Headline from '@/components/partials/Headline';

interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const instructor = await getInstructorById(id);

  return (
    <div className="w-full">
      <Headline name="New Instructor" />
      <CreateInstructor pageType="view" instructor={instructor} />
    </div>
  );
};

export default page;
