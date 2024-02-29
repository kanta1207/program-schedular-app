import { CohortTable } from '@/components/pages/cohorts/CohortTable';
import Headline from '@/components/partials/Headline';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

const page = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Headline name="Cohorts" />
        <Link href={'/cohorts/new'}>
          <Button variant="contained">New Cohort</Button>
        </Link>
      </Box>
      <CohortTable />
    </>
  );
};

export default page;
