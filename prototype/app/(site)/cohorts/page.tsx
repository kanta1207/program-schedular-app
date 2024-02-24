"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Select } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { cohorts, intakes } from "@/mock/_index";
import { PERIOD_OF_DAYS, PROGRAMS } from "@/constants/_index";

const CohortList = () => {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className="w-full p-20">
      <div className="flex justify-end">
        <Button variant="contained" onClick={() => setIsCreating(!isCreating)}>
          New cohort
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
            <Button variant="contained">Create course</Button>
          </div>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Intake name</TableCell>
              <TableCell>Cohort name</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Period</TableCell>
              {/* empty head for edit and delete */}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cohorts.map((cohort) => (
              <TableRow
                key={cohort.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {cohort.intake.name}
                </TableCell>
                <TableCell>{cohort.name}</TableCell>
                <TableCell>{cohort.program.name}</TableCell>
                <TableCell>{cohort.periodOfDay.name}</TableCell>
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
  );
};

export default CohortList;
