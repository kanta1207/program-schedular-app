"use client";
import { useState } from "react";
import {
  Input,
  Select,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { cohorts, intakes } from "@/mock/_index";
import { PERIOD_OF_DAYS, PROGRAMS } from "@/constants/_index";
import { classes } from "@/mock/class";
import dayjs from "dayjs";

interface CohortDetailProps {
  params: {
    id: string;
  };
}

const CohortDetail: React.FC<CohortDetailProps> = ({ params: { id } }) => {
  const [isCreating, setIsCreating] = useState(false);
  const cohort = cohorts.find((cohort) => cohort.id === +id);
  if (!cohort) return;
  const belongingClasses = classes.filter(
    (classItem) => classItem.cohort.id === +id
  );

  return (
    <div className="w-full">
      <div className="p-20 space-y-8">
        <div className="flex items-center gap-6">
          <p>Intake:</p>
          <Input defaultValue={cohort.intake.name} disabled />
        </div>
        <div className="flex items-center gap-6">
          <p>Cohort:</p>
          <Input defaultValue={cohort.name} disabled />
        </div>
        <div className="flex items-center gap-6">
          <p>Program</p>
          <Input defaultValue={cohort.program.name} disabled />
        </div>
        <div className="flex items-center gap-6">
          <p>Period</p>
          <Input defaultValue={cohort.periodOfDay.name} disabled />
        </div>
      </div>

      {/* Class list */}
      <div className="w-full p-20">
        <div className="flex justify-end">
          <Button
            variant="contained"
            onClick={() => setIsCreating(!isCreating)}
          >
            New class
          </Button>
        </div>
        {isCreating && (
          <Box
            display="flex"
            alignItems="end"
            justifyContent="space-between"
            p={2}
            marginY={2}
          >
            <div className="flex gap-x-4 items-end">
              <Box sx={{ minWidth: 240 }}>
                <FormControl fullWidth>
                  <InputLabel id="intake-label">Intake</InputLabel>
                  <Select
                    labelId="intake-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Intake"
                    // onChange={handleChange}
                  >
                    {intakes.map((intake) => (
                      <MenuItem key={intake.id} value={intake.name}>
                        {intake.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Cohort name"
                  variant="outlined"
                />
              </Box>

              <Box sx={{ minWidth: 160 }}>
                <FormControl fullWidth>
                  <InputLabel id="intake-label">Program</InputLabel>
                  <Select
                    labelId="intake-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Intake"
                    // onChange={handleChange}
                  >
                    {PROGRAMS.map((program) => (
                      <MenuItem key={program.id} value={program.name}>
                        {program.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ minWidth: 160 }}>
                <FormControl fullWidth>
                  <InputLabel id="intake-label">Period</InputLabel>
                  <Select
                    labelId="intake-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Intake"
                    // onChange={handleChange}
                  >
                    {PERIOD_OF_DAYS.map((period) => (
                      <MenuItem key={period.id} value={period.name}>
                        {period.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className="flex gap-x-2">
              <Button
                variant="outlined"
                onClick={() => setIsCreating(!isCreating)}
              >
                Cancel
              </Button>
              <Button variant="contained">Create class</Button>
            </div>
          </Box>
        )}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start date</TableCell>
                <TableCell>End date</TableCell>
                <TableCell>Course name</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Hours / Required</TableCell>
                <TableCell>Instructor</TableCell>
                {/* empty head for edit and delete */}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {belongingClasses.map((classItem) => (
                <TableRow
                  key={classItem.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {dayjs(classItem.startAt).format("YYYY-MM-DD (ddd)")}
                  </TableCell>
                  <TableCell>
                    {dayjs(classItem.endAt).format("YYYY-MM-DD (ddd)")}
                  </TableCell>
                  <TableCell>{classItem.course.name}</TableCell>
                  <TableCell>{classItem.weekdaysRange.name}</TableCell>
                  <TableCell>/ {classItem.course.requiredHours}</TableCell>
                  <TableCell>{classItem.instructor?.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-x-2">
                      <Button variant="outlined">Edit</Button>
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CohortDetail;
