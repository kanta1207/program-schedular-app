'use client';
import { deleteCourse } from '@/actions/courses/deleteCourse';
import { updateCourse } from '@/actions/courses/updateCourse';
import ErrorMessages from '@/components/partials/ErrorMessages';
import { RequiredMark } from '@/components/partials/RequiredMark';
import TableMenu from '@/components/partials/TableMenu';
import { TOAST } from '@/constants/_index';
import { usePagination } from '@/hooks/usePagination';
import { inBoxScrollBar, tableStyle, thRowStyle } from '@/styles/_index';
import { GetCoursesResponse, GetProgramsResponse } from '@/types/_index';
import { Box, MenuItem, Select, TableFooter, TablePagination } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next-nprogress-bar';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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

    try {
      if (!editCourseId) {
        throw new Error('Unexpected Error: id is not selected');
      }

      await updateCourse(editCourseId, payload);

      toast.success(TOAST.success.updated);
      setEditCourseId(null);
      router.refresh();
    } catch (error: any) {
      toast.error(<ErrorMessages message={error.message} />);
    }
  };

  // Function to enter edit mode for a specific row
  const handleEditClick = (course: GetCoursesResponse) => {
    setEditCourseId(course.id);
    reset({
      name: course.name,
      programId: course.program.id,
      requiredHours: course.requiredHours.toString(),
    });
  };

  // Function to cancel editing and exit edit mode
  const handleCancelClick = () => {
    setEditCourseId(null); // Reset the edit state to exit edit mode
  };

  const {
    rowsPerPageOptions,
    count,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    ActionsComponent,
    emptyRows,
  } = usePagination({
    count: courses.length,
    rowsPerPage: 25,
    page: 0,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ overflowX: 'scroll', ...inBoxScrollBar }}>
        <Table sx={tableStyle}>
          <TableHead>
            <TableRow sx={thRowStyle}>
              <TableCell sx={{ width: 'calc(100% * 3/12)' }}>
                Course name
                {editCourseId && <RequiredMark />}
              </TableCell>
              <TableCell sx={{ width: 'calc(100% * 3/12)' }}>
                Program
                {editCourseId && <RequiredMark />}
              </TableCell>
              <TableCell sx={{ width: 'calc(100% * 3/12)' }}>
                Required hours
                {editCourseId && <RequiredMark />}
              </TableCell>
              {/* Empty head for edit and delete */}
              <TableCell sx={{ width: 'calc(100% * 3/12)' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : courses).map(
              (course) => (
                <TableRow key={course.id}>
                  {editCourseId === course.id ? (
                    // Edit mode
                    <>
                      <TableCell sx={{ px: '0.5rem' }}>
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
                                required
                              />
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ px: '0.5rem' }}>
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

                      <TableCell sx={{ px: '0.5rem' }}>
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
              ),
            )}
            {emptyRows > 0 && <TableRow style={{ height: 57 * emptyRows }} />}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={ActionsComponent}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </form>
  );
};

export default CourseListTable;
