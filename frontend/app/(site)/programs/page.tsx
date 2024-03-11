import { getPrograms } from '@/actions/programs/getPrograms';
import CreateProgram from '@/components/pages/programs/CreateProgram';
import ProgramTableList from '@/components/pages/programs/ProgramsListTable';
import Headline from '@/components/partials/Headline';

const ProjectList = async () => {
  const { data: programs } = await getPrograms();
  return (
    <>
      <Headline name="Programs" />
      <CreateProgram />
      <ProgramTableList programs={programs} />
    </>
  );
};

export default ProjectList;
