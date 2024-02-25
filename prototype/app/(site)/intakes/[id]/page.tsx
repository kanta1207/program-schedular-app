"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
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
import { intakes } from "@/mock/_index";
import { PERIOD_OF_DAYS, PROGRAMS } from "@/constants/_index";
import { cohorts } from "@/mock/_index";

interface IntakeDetailProps {
  params: {
    id: string;
  };
}

const IntakeDetail: React.FC<IntakeDetailProps> = ({ params: { id } }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const intake = intakes.find((intake) => intake.id === +id);
  if (!intake) return;
  const belongingCohorts = cohorts.filter((classItem) => classItem.intake?.id === +id);

  return (
    <div className="w-full">
      <div className="p-20 space-y-8">
        <div className="flex items-center gap-6">
          <p>Name:</p>
          <Input defaultValue={intake.name} disabled={!isEditable} />
        </div>

        <div className="flex items-center gap-6">
          <p>Start date:</p>
          <Input defaultValue={dayjs(intake.startAt).format("YYYY-MM-DD (ddd)")} disabled={!isEditable} />
        </div>

        <div className="flex items-center gap-6">
          <p>End date:</p>
          <Input defaultValue={dayjs(intake.endAt).format("YYYY-MM-DD (ddd)")} disabled={!isEditable} />
        </div>

        <div className="flex">
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
              <Button variant="contained" color="error" onClick={() => confirm("Are you sure to delete?")}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Create new cohort */}
        <div className="flex justify-end">
          <Button variant="contained" onClick={() => setIsCreating(!isCreating)}>
            New cohort
          </Button>
        </div>
        {isCreating && (
          <Box display="flex" alignItems="end" justifyContent="space-between" p={2} marginY={2}>
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
                <TextField id="outlined-basic" label="Cohort name" variant="outlined" />
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
              <Button variant="outlined" onClick={() => setIsCreating(!isCreating)}>
                Cancel
              </Button>
              <Button variant="contained">Create cohort</Button>
            </div>
          </Box>
        )}
      </div>

      {/* Belonging cohorts */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cohort</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Period</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {belongingCohorts.map((cohort) => (
              <TableRow key={cohort.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {cohort.name}
                </TableCell>
                <TableCell>{cohort.program.name}</TableCell>
                <TableCell>{cohort.periodOfDay.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IntakeDetail;
