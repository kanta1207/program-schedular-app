import { GetCohortsResponse, GetInstructorsResponse, GetIntakesResponse } from '@/types/_index';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export interface FilterDialogProps {
  dialogOpen: boolean;
  onClose: (value?: ScheduleFilters) => void;
  instructors: GetInstructorsResponse[];
  intakes: GetIntakesResponse[];
  cohorts: GetCohortsResponse[];
}

export interface ScheduleFilters {
  cohortIds: number[];
  instructorIds: number[];
}

export const filterKey = 'scheduleFilters';

const FilterScheduleDialog: React.FC<FilterDialogProps> = ({
  onClose,
  dialogOpen: dialogOpen,
  instructors,
  intakes,
  cohorts,
}) => {
  const [storedFilterSettings, setStoredFilterSettings] = useState<ScheduleFilters>();
  const [isAllCohortsChecked, setIsAllCohortsChecked] = useState(false);
  const [isCohortsIndeterminate, setIsCohortsIndeterminate] = useState(false);
  const [isAllInstructorsChecked, setIsAllInstructorsChecked] = useState(false);
  const [isInstructorsIndeterminate, setIsInstructorsIndeterminate] = useState(false);

  const instructorIds = instructors.map(({ id }) => id);
  const cohortIds = cohorts.map(({ id }) => id);

  const { control, handleSubmit, reset, setValue, watch } = useForm<ScheduleFilters>({
    defaultValues: {
      cohortIds: [],
      instructorIds: [],
    },
  });

  const onSubmit: SubmitHandler<ScheduleFilters> = async (data) => {
    try {
      const payload = {
        cohortIds: data.cohortIds,
        instructorIds: data.instructorIds,
      };

      const filterSettings = JSON.stringify({
        cohortIds: payload.cohortIds,
        instructorIds: payload.instructorIds,
      });
      localStorage.setItem(filterKey, filterSettings);

      onClose(payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (dialogOpen) {
      const storedFilterSettings = localStorage.getItem(filterKey);
      if (storedFilterSettings) {
        const filterSettings: ScheduleFilters = JSON.parse(storedFilterSettings);
        setStoredFilterSettings(filterSettings);

        reset({
          cohortIds: filterSettings.cohortIds,
          instructorIds: filterSettings.instructorIds,
        });
      } else {
        reset();
      }
    }
  }, [dialogOpen]);

  // handle parent checkbox (cohorts)
  useEffect(() => {
    const checkedCohortIds = watch('cohortIds');
    setIsAllCohortsChecked(cohortIds.every((id) => checkedCohortIds.includes(id)));
    setIsCohortsIndeterminate(checkedCohortIds.length > 0 && checkedCohortIds.length !== cohortIds.length);
  }, [watch('cohortIds')]);

  const handleCohortsParentCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('cohortIds', event.target.checked ? cohortIds : []);
    setIsAllCohortsChecked(event.target.checked);
    setIsCohortsIndeterminate(false);
  };

  // handle parent checkbox (instructors)
  useEffect(() => {
    const checkedInstructors = watch('instructorIds');
    setIsAllInstructorsChecked(instructorIds.every((id) => checkedInstructors.includes(id)));
    setIsInstructorsIndeterminate(checkedInstructors.length > 0 && checkedInstructors.length !== instructorIds.length);
  }, [watch('instructorIds')]);

  const handleInstructorsParentCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('instructorIds', event.target.checked ? instructorIds : []);
    setIsAllInstructorsChecked(event.target.checked);
    setIsInstructorsIndeterminate(false);
  };

  const handleClose = () => {
    onClose(storedFilterSettings);
  };

  // styles
  const inBoxScrollBar = {
    '&::-webkit-scrollbar': { width: '0.5rem' },
    '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
    '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.200', borderRadius: '0.25rem' },
  };

  const checkboxOuterBox = {
    display: 'flex',
    flexDirection: 'column',
    height: '420px',
    overflowY: 'scroll',
    padding: '1rem',
    bgcolor: 'grey.50',
    borderRadius: '0.25rem',
    '& .MuiCheckbox-root': { paddingBlock: '0.25rem' },
    ...inBoxScrollBar,
  };

  return (
    <form>
      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <Box sx={{ padding: '1rem' }}>
          <DialogTitle sx={{ padding: 'unset' }}>Filter Schedule</DialogTitle>
          <DialogContent
            sx={{ padding: 'unset', display: 'flex', gap: '1rem', '& > div': { padding: '1rem', width: '50%' } }}
          >
            {/* cohortIds */}
            <Controller
              name="cohortIds"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAllCohortsChecked}
                        indeterminate={isCohortsIndeterminate}
                        onChange={handleCohortsParentCheckboxChange}
                        name="cohortIds"
                      />
                    }
                    label="Cohorts"
                    sx={{ '& > span': { fontWeight: 'bold' } }}
                  />
                  <Box sx={checkboxOuterBox}>
                    {intakes.map((intake) => {
                      const intakeCohorts = cohorts.filter((cohort) => cohort.intake.id === intake.id);
                      return (
                        <Box key={intake.id} sx={{ mb: '0.8rem' }}>
                          <Typography sx={{ fontWeight: 'medium' }}>{intake.name}</Typography>
                          <Box sx={{ ml: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                            {intakeCohorts.map((cohort) => (
                              <FormControlLabel
                                key={cohort.id}
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={field.value.includes(cohort.id)}
                                    onChange={(e) => {
                                      const selectedValue = +e.target.value;
                                      setValue(
                                        'cohortIds',
                                        field.value.includes(selectedValue)
                                          ? field.value.filter((id) => id !== selectedValue)
                                          : [...field.value, selectedValue],
                                      );
                                    }}
                                    value={cohort.id}
                                  />
                                }
                                label={cohort.name}
                              />
                            ))}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </FormGroup>
              )}
            />

            {/* instructorIds */}
            <Controller
              name="instructorIds"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    sx={{ '& > span': { fontWeight: 'bold' } }}
                    control={
                      <Checkbox
                        checked={isAllInstructorsChecked}
                        indeterminate={isInstructorsIndeterminate}
                        onChange={handleInstructorsParentCheckboxChange}
                        name="allIInstructors"
                      />
                    }
                    label="Instructors"
                  />
                  <Box sx={checkboxOuterBox}>
                    {instructors.map((instructor) => (
                      <FormControlLabel
                        key={instructor.id}
                        control={
                          <Checkbox
                            size="small"
                            value={instructor.id}
                            checked={field.value.includes(instructor.id)}
                            onChange={(e) => {
                              const selectedValue = +e.target.value;
                              setValue(
                                'instructorIds',
                                field.value.includes(selectedValue)
                                  ? field.value.filter((value) => value !== selectedValue)
                                  : [...field.value, selectedValue],
                              );
                            }}
                          />
                        }
                        label={instructor.name}
                      />
                    ))}
                  </Box>
                </FormGroup>
              )}
            />
          </DialogContent>
          <DialogActions sx={{ display: 'flex', gap: '1rem' }}>
            <Button variant="outlined" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
              Apply
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </form>
  );
};

export default FilterScheduleDialog;
