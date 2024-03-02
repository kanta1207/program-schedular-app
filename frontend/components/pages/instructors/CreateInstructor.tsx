'use client';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import { courses } from '@/mock/_index';

const CreateInstructor = () => {
  const coursesByProgram = (programName: string) => {
    return courses
      .filter((course) => course.program.name === programName)
      .map((course) => (
        <FormControlLabel key={course.id} control={<Checkbox />} label={course.name} value={course.name} />
      ));
  };
  return (
    <TableContainer>
      <Table aria-label="Instructor form table">
        <TableBody>
          <TableRow>
            <TableCell sx={{ border: 'none' }}>Name:</TableCell>
            <TableCell sx={{ border: 'none' }}>
              <TextField variant="outlined" sx={{ width: '20rem' }} size="small" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border: 'none' }}>Contract:</TableCell>
            <TableCell sx={{ border: 'none' }}>
              <RadioGroup row>
                <FormControlLabel value="fullTime" control={<Radio />} label="Full Time" />
                <FormControlLabel value="partTime" control={<Radio />} label="Part Time" />
                <FormControlLabel value="contract" control={<Radio />} label="Contract" />
              </RadioGroup>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border: 'none' }}>Hours:</TableCell>
            <TableCell sx={{ border: 'none' }}>
              <RadioGroup row>
                <FormControlLabel value="10" control={<Radio />} label="10" />
                <FormControlLabel value="20" control={<Radio />} label="20" />
                <FormControlLabel value="30" control={<Radio />} label="30" />
                <FormControlLabel value="40" control={<Radio />} label="40" />
              </RadioGroup>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border: 'none' }}>Days:</TableCell>
            <TableCell sx={{ border: 'none' }}>
              <FormGroup row>
                <FormControlLabel value="monFri" control={<Checkbox />} label="Mon - Fri" />
                <FormControlLabel value="monWed" control={<Checkbox />} label="Mon - Wed" />
                <FormControlLabel value="wedFri" control={<Checkbox />} label="Wed - Fri" />
              </FormGroup>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border: 'none' }}>Period:</TableCell>
            <TableCell sx={{ border: 'none' }}>
              <FormGroup row>
                <FormControlLabel value="morning" control={<Checkbox />} label="🌅 Morning" />
                <FormControlLabel value="afternoon" control={<Checkbox />} label="☀️ Afternoon" />
                <FormControlLabel value="evening" control={<Checkbox />} label="🌙 Evening" />
              </FormGroup>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border: 'none' }}>Active:</TableCell>
            <TableCell sx={{ border: 'none' }}>
              <Switch />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border: 'none' }}>Course:</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border: 'none' }}>DMS:</TableCell>
            <TableCell sx={{ border: 'none' }}>
              <FormGroup row>{coursesByProgram('DMS')}</FormGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 'none' }}>DMA:</TableCell>
            <TableCell sx={{ border: 'none' }}>
              <FormGroup row>{coursesByProgram('DMA')}</FormGroup>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border: 'none' }}>Notes:</TableCell>
            <TableCell sx={{ border: 'none' }}>
              <TextField multiline rows={4} variant="outlined" />
            </TableCell>
          </TableRow>
          {/* Buttons */}
          <TableRow>
            <TableCell sx={{ border: 'none' }} colSpan={2} align="right">
              <Button variant="outlined" color="primary" style={{ marginRight: '8px' }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CreateInstructor;
