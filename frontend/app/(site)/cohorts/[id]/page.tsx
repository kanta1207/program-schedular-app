import { Box, Typography } from '@mui/material';

type PageProps = {
  params: { id: number };
};

const page = ({ params }: PageProps) => {
  const { id } = params;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Typography variant="h4">Cohort</Typography>
      </Box>
      <div>Cohort ID: {id}</div>
    </>
  );
};

export default page;
