import { getBreaks } from '@/actions/breaks/getBreaks';
import BreakListTable from '@/components/pages/breaks/BreakListTable';
import CreateBreak from '@/components/pages/breaks/CreateBreak';
import Headline from '@/components/partials/Headline';

const BreakList = async () => {
  const { data: breaks } = await getBreaks();
  return (
    <>
      <Headline name="Breaks" />
      <CreateBreak />
      <BreakListTable breaks={breaks} />
    </>
  );
};

export default BreakList;
