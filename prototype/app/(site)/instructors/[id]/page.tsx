'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Input, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { courses, instructors } from '@/mock/_index';
import { CONTRACT_TYPES, DESIRED_WORKING_HOURS, PERIOD_OF_DAYS, WEEKDAYS_RANGES } from '@/constants/_index';
import { classes } from '@/mock/class';
import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { convertClassesToGanttItems } from '@/helpers/convert-classes-to-gantt-items';
import { ScheduleGuide } from '../../schedules/Client';
import theme from '@/app/theme';

interface InstructorDetailProps {
  params: {
    id: string;
  };
}

const InstructorDetail: React.FC<InstructorDetailProps> = ({ params: { id } }) => {
  const [isEditable, setIsEditable] = useState(false);
  const instructor = instructors.find((instructor) => instructor.id === +id);
  if (!instructor) return;
  const belongingClasses = classes.filter((classItem) => classItem.instructor?.id === +id);

  const ganttItems = convertClassesToGanttItems({ classes: belongingClasses, groupBy: 'cohort' });
  const filteredItems = ganttItems.filter(
    (obj, index, array) => array.findIndex((item) => item.project === obj.project) !== index,
  );

  return (
    <div className="w-full">
      <div className="p-20 space-y-8">
        <div className="flex items-center gap-6">
          <p>Name:</p>
          <Input defaultValue={instructor.name} disabled={!isEditable} />
        </div>

        <div className="flex gap-6">
          <p>Contract:</p>
          <RadioGroup
            defaultValue={instructor.contractType.id.toString()}
            className="flex gap-x-4"
            disabled={!isEditable}
          >
            {CONTRACT_TYPES.map((contractType) => (
              <div key={contractType.id} className="flex items-center space-x-2">
                <RadioGroupItem value={contractType.id.toString()} id={contractType.name} />
                <Label htmlFor={contractType.name}>{contractType.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex gap-6">
          <p>Desired working hours:</p>
          <RadioGroup
            defaultValue={instructor.desiredWorkingHours + ''}
            className="flex gap-x-4"
            disabled={!isEditable}
          >
            {DESIRED_WORKING_HOURS.map((hours) => (
              <div key={hours} className="flex items-center space-x-2">
                <RadioGroupItem value={hours.toString()} id={hours.toString()} />
                <Label htmlFor={hours.toString()}>{hours}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex gap-6">
          <p>Days:</p>
          <RadioGroup
            defaultValue={instructor.weekdaysRange.id.toString()}
            className="flex gap-x-4"
            disabled={!isEditable}
          >
            {WEEKDAYS_RANGES.map((range) => (
              <div key={range.id} className="flex items-center space-x-2">
                <RadioGroupItem value={range.id.toString()} id={range.name} />
                <Label htmlFor={range.name}>{range.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex gap-6">
          <p>Period:</p>
          {PERIOD_OF_DAYS.map((period) => (
            <div key={period.id} className="items-top flex space-x-2">
              <Checkbox
                defaultChecked={instructor.periodOfDays.findIndex(({ id }) => period.id === id) !== -1}
                disabled={!isEditable}
              />
              <Label>{period.name}</Label>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          <p>Active:</p>
          <Switch defaultChecked={instructor.isActive} disabled={!isEditable} />
        </div>

        <p>Course:</p>
        <p>DMS:</p>
        <div className="flex flex-wrap gap-6">
          {courses.map(
            (course) =>
              course.program.name === 'DMS' && (
                <div key={course.id} className="items-top flex space-x-2">
                  <Checkbox
                    defaultChecked={instructor.courses.findIndex(({ id }) => course.id === id) !== -1}
                    disabled={!isEditable}
                  />
                  <Label>{course.name}</Label>
                </div>
              ),
          )}
        </div>
        <p>DMA:</p>
        <div className="flex flex-wrap gap-6">
          {courses.map(
            (course) =>
              course.program.name === 'DMA' && (
                <div key={course.id} className="items-top flex space-x-2">
                  <Checkbox
                    defaultChecked={instructor.courses.findIndex(({ id }) => course.id === id) !== -1}
                    disabled={!isEditable}
                  />
                  <Label>{course.name}</Label>
                </div>
              ),
          )}
        </div>

        <div className="flex justify-end">
          {isEditable ? (
            <div className="flex gap-2">
              <Button onClick={() => window.location.reload()}>Cancel</Button>
              <Button variant="contained">Save changes</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outlined" onClick={() => setIsEditable(!isEditable)}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => confirm('Are you sure to delete?')}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      {belongingClasses.length > 0 && (
        <>
          <ScheduleGuide />
          <div className="text-xs">
            <Gantt
              tasks={filteredItems}
              viewMode={ViewMode.Week}
              viewDate={dayjs().subtract(2, 'week').toDate()}
              columnWidth={60}
              projectBackgroundColor={theme.palette.primary.main}
              projectProgressColor={theme.palette.primary.main}
              projectProgressSelectedColor={theme.palette.primary.light}
              projectBackgroundSelectedColor={theme.palette.primary.light}
              fontSize="12"
              onClick={() => alert('We can show drawer or something to update this schedule')}
            />
          </div>
        </>
      )}
      {/* Belonging classes */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Class term</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Cohort</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Classroom</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {belongingClasses.map((classItem) => (
              <TableRow key={classItem.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {dayjs(classItem.startAt).format('YYYY-MM-DD (ddd)')} -{' '}
                  {dayjs(classItem.endAt).format('YYYY-MM-DD (ddd)')}
                </TableCell>
                <TableCell>{classItem.course.program.name}</TableCell>
                <TableCell>{classItem.course.name}</TableCell>
                <TableCell>{classItem.cohort.name}</TableCell>
                <TableCell>{classItem.weekdaysRange.name}</TableCell>
                <TableCell>{classItem.cohort.periodOfDay.time}</TableCell>
                <TableCell>
                  {classItem.classroom.name} ({classItem.classroom.floor} floor)
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InstructorDetail;
