import BreakListTable from '@/components/pages/breaks/BreakListTable';
import CreateBreak from '@/components/pages/breaks/CreateBreak';
import Headline from '@/components/partials/Headline';
import { breaks } from '@/mock/_index';

const BreakList = () => {
  const sortedBreaks = breaks.sort((a, b) => b.startAt.getTime() - a.startAt.getTime());
  return (
    <>
      <Headline name="Breaks" />
      <CreateBreak />
      <BreakListTable breaks={sortedBreaks} />
    </>
  );
};

export default BreakList;
