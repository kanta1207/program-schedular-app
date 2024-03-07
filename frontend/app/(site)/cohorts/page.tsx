import { getCohorts } from '@/actions/cohorts/getCohorts';
import { CohortListTable } from '@/components/pages/cohorts/CohortListTable';
import Headline from '@/components/partials/Headline';
import { Button } from '@mui/material';

const page = async () => {
  const cohorts = await getCohorts();
  return (
    <>
      <Headline name="Cohorts" />
      <div className="flex justify-end mb-4 ">
        <Button href="cohorts/new" variant="contained">
          New Cohort
        </Button>
      </div>
      <CohortListTable cohorts={cohorts} />
    </>
  );
};

export default page;
