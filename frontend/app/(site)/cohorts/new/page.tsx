import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';

const page = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Typography variant="h4">New Cohort</Typography>
      </Box>
      <form className="w-fit">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '5rem' }}>Name:</Typography>
            <TextField sx={{ width: '12rem' }} size="small" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '5rem' }}>Intake:</Typography>
            <Select sx={{ width: '12rem' }} size="small" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '5rem' }}>Program:</Typography>
            <Select sx={{ width: '12rem' }} size="small">
              <MenuItem>DMS</MenuItem>
              <MenuItem>DMA</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '5rem' }}>Period:</Typography>
            <Select sx={{ width: '12rem' }} size="small" />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', width: 'fit-content', position: 'relative', left: '100%' }}>
          <Button size="medium" variant="outlined">
            Cancel
          </Button>
          <Button size="medium" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default page;
