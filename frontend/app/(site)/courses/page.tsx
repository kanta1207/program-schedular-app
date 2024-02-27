import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { courses } from '@/mock/_index';
import CreateCourse from '@/components/pages/courses/CreateCourse';
import Typography from '@mui/material/Typography';
const CourseList = () => {
  return (
    <div className="w-full p-20">
      <CreateCourse />
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Course name</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Program</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Required hours</TableCell>
            {/* empty head for edit and delete */}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, i) => (
            <TableRow key={i}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.program.name}</TableCell>
              <TableCell>{course.requiredHours}</TableCell>
              <TableCell className="flex justify-between">
                <Button variant={'outlined'}>Edit</Button>
                <Button variant={'contained'} color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseList;
