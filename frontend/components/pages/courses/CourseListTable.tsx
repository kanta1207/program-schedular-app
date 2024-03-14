'use client';
import React, { useState } from 'react';
import TableMenu from '@/components/partials/TableMenu';
import { GetCoursesResponse } from '@/types/course';
import { MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateCourse } from '@/actions/courses/updateCourse';
import { useRouter } from 'next/navigation';
import { GetProgramsResponse } from '@/types/program';
import { deleteCourse } from '@/actions/courses/deleteCourse';

interface CourseListTableProps {
  courses: GetCoursesResponse[];
  programs: GetProgramsResponse[];
}

interface CourseFormValues {
  name: string;
  programId: number;
  requiredHours: string;
}

const CourseListTable: React.FC<CourseListTableProps> = ({ courses, programs }) => {
  const [editCourseId, setEditCourseId] = useState<number | null>(null);
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<CourseFormValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<CourseFormValues> = async (data) => {
    const payload = {
      ...data,
      requiredHours: Number(data.requiredHours),
    };

    console.log(payload);

    try {
      if (!editCourseId) {
        throw new Error('Unexpected Error: id is not selected');
      }

      await updateCourse(editCourseId, payload);
      setEditCourseId(null);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to enter edit mode for a specific row
  const handleEditClick = (course: GetCoursesResponse) => {
    setEditCourseId(course.id);
    reset({
      name: course.name,
      programId: course.program.id, // Selectのvalueが文字列であるため、数値を文字列に変換
      requiredHours: course.requiredHours.toString(),
    });
  };

  const handleDeleteClick = (id: number) => {};

  // Function to cancel editing and exit edit mode
  const handleCancelClick = () => {
    setEditCourseId(null); // Reset the edit state to exit edit mode
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ border: '1px solid white', color: 'white', width: '20rem' }}>Course name</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white', width: '20rem' }}>Program</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white', width: '20rem' }}>Required hours</TableCell>
            {/* Empty head for edit and delete */}
            <TableCell sx={{ border: '1px solid white', color: 'white', width: '20rem' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              {editCourseId === course.id ? (
                // Edit mode
                <>
                  <TableCell>
                    <Controller
                      control={control}
                      name="name"
                      rules={{ required: true }}
                      render={({ field }: any) => {
                        return (
                          <TextField
                            value={field.value}
                            onChange={(name) => field.onChange(name)}
                            variant="outlined"
                            sx={{ width: '100%' }}
                          />
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={control}
                      name="programId"
                      rules={{
                        required: true,
                        pattern: { value: /^\d+$/, message: '' },
                      }}
                      render={({ field }: any) => {
                        return (
                          <Select
                            labelId="select-program"
                            id="select-program"
                            defaultValue={String(course.program.id)}
                            onChange={(programId) => field.onChange(programId)}
                            sx={{ width: '100%' }}
                            required
                          >
                            {programs.map((program) => (
                              <MenuItem key={program.id} value={program.id}>
                                {program.name}
                              </MenuItem>
                            ))}
                          </Select>
                        );
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Controller
                      control={control}
                      name="requiredHours"
                      rules={{ required: true }}
                      render={({ field }: any) => {
                        return (
                          <TextField
                            required
                            id="requiredHours"
                            placeholder="60"
                            type="number"
                            value={field.value}
                            sx={{ width: '100%' }}
                            onChange={(requiredHours) => field.onChange(requiredHours)}
                            inputProps={{
                              type: 'number',
                              min: 0,
                              max: 999,
                              maxLength: 3,
                              onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = Math.max(0, parseInt(e.target.value))
                                  .toString()
                                  .slice(0, e.target.maxLength);
                              },
                            }}
                          />
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-x-2.5">
                      <Button variant="outlined" onClick={() => handleCancelClick()}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained">
                        Save
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                // Display mode
                <>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.program.name}</TableCell>
                  <TableCell>{course.requiredHours}</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TableMenu id={course.id} onEdit={() => handleEditClick(course)} onDelete={deleteCourse} />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  );
};

export default CourseListTable;
