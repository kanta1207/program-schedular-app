import CreateIntake from '@/components/pages/intakes/CreateIntake';
import IntakeTableList from '@/components/pages/intakes/IntakeTableList';
import Headline from '@/components/partials/Headline';
import { getIntakes } from '@/actions/intakes/getIntakes';
const IntakeList = async () => {
  const intakes = await getIntakes();
  return (
    <div className="w-full">
      <Headline name="Intakes" />
      <CreateIntake />
      <IntakeTableList intakes={intakes} />
    </div>
  );
};

export default IntakeList;
