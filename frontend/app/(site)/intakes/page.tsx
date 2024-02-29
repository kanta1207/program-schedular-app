import CreateIntake from '@/components/pages/intakes/CreateIntake';
import IntakeTableList from '@/components/pages/intakes/IntakeTableList';
import Headline from '@/components/partials/Headline';
const IntakeList = () => {
  return (
    <div className="w-full">
      <Headline name="Intakes" />
      <CreateIntake />
      <IntakeTableList />
    </div>
  );
};

export default IntakeList;
