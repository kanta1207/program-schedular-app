'use client';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { courses } from '@/mock/_index';
import CustomizedMenus from './TableMenu';
const CourseTableList = () => {
  const [editCourseId, setEditCourseId] = useState(null);

  // Function to enter edit mode for a specific row
  const handleEditClick = (index: any) => {
    setEditCourseId(index);
  };

  // Function to cancel editing and exit edit mode
  const handleCancelClick = () => {
    setEditCourseId(null); // Reset the edit state to exit edit mode
  };
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Course name</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Program</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Required hours</TableCell>
            <TableCell></TableCell> {/* Empty head for edit and delete */}
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              {editCourseId === index ? (
                // Edit mode
                <>
                  <TableCell>
                    <TextField defaultValue={course.name} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField defaultValue={course.program.name} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField defaultValue={course.requiredHours} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="error" onClick={handleCancelClick} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={() => handleEditClick(index)}>
                      Save
                    </Button>
                  </TableCell>
                </>
              ) : (
                // Display mode
                <>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.program.name}</TableCell>
                  <TableCell>{course.requiredHours}</TableCell>
                  <TableCell>
                    <CustomizedMenus index={index} onEdit={handleEditClick} />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTableList;
