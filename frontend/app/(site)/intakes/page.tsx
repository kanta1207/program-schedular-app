import { getIntakes } from '@/actions/intakes/getIntakes';
import CreateIntake from '@/components/pages/intakes/CreateIntake';
import IntakeListTable from '@/components/pages/intakes/IntakeListTable';
import Headline from '@/components/partials/Headline';
const IntakeList = async () => {
  const { data: intakes } = await getIntakes();
  return (
    <div className="w-full">
      <Headline name="Intakes" />
      <CreateIntake />
      <IntakeListTable intakes={intakes} />
    </div>
  );
};

export default IntakeList;
