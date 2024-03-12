import { getPrograms } from '@/actions/programs/getPrograms';
import CreateProgram from '@/components/pages/programs/CreateProgram';
import ProgramListTable from '@/components/pages/programs/ProgramsListTable';
import Headline from '@/components/partials/Headline';

const page = async () => {
  const { data: programs } = await getPrograms();
  return (
    <>
      <Headline name="Programs" />
      <CreateProgram />
      <ProgramListTable programs={programs} />
    </>
  );
};

export default page;
