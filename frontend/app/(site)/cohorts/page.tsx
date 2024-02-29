import { CohortTable } from '@/components/pages/cohorts/CohortTable';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

const page = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Typography variant="h4">Cohort</Typography>
        <Link href={'/cohorts/new'}>
          <Button variant="contained">New Cohort</Button>
        </Link>
      </Box>
      <CohortTable />
    </>
  );
};

export default page;
