'use client';

import { useEffect, useRef, useState } from 'react';
import ViewSwitcher, { ViewType } from './ViewSwitcher';
import { InstructorScheduleTable } from './InstructorScheduleTable';

import { GetInstructorsResponse } from '@/types/instructor';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, Tooltip, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from 'dayjs';
import theme from '@/app/theme';
import Headline from '@/components/partials/Headline';
import GanttToolTip from '@/components/partials/gantt/GanttToolTip';

import { useScreenshot } from '@/hooks/useScreenShot';
import { toast } from 'react-toastify';
import { TOAST } from '@/constants/message';
import { GetCohortsResponse } from '@/types/cohort';

interface InstructorScheduleProps {
  instructor: GetInstructorsResponse;
  cohorts: GetCohortsResponse[];
  ganttItems: Task[];
}

const InstructorSchedule: React.FC<InstructorScheduleProps> = ({ instructor, ganttItems, cohorts }) => {
  const [viewType, setViewType] = useState<ViewType>('list');
  const [isIncludeEndedIntake, setIsIncludeEndedIntake] = useState<boolean>(false);
  const [filteredGanttItems, setFilteredGanttItems] = useState<Task[]>(ganttItems);
  const ref = useRef(null);

  useEffect(() => {
    if (!isIncludeEndedIntake) {
      const now = dayjs();
      const today = now.startOf('day');
      const ongoingCohortIds = cohorts.filter((cohort) => dayjs(cohort.intake.endAt) > today).map(({ id }) => id);
      const filteredItems = ganttItems.filter((ganttItem) => {
        const cohortId = ganttItem.project?.split('-')[0];
        if (cohortId) {
          return ongoingCohortIds.includes(Number(cohortId));
        }
      });
      setFilteredGanttItems(filteredItems);
    } else {
      setFilteredGanttItems(ganttItems);
    }
  }, [isIncludeEndedIntake]);

  const { takeScreenshot } = useScreenshot();

  const fileName = `${instructor.name.replace(/\s/g, '_')}_${dayjs().format('YYYY-MM-DD')}`;

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newViewType: ViewType) => {
    setViewType(newViewType);
  };

  const handleTakeScreenshot = () => {
    try {
      ref.current && takeScreenshot(ref.current, fileName);
    } catch (error) {
      toast.error(TOAST.error.screenshot);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: '0.35rem' }}>
        <Box sx={{ display: 'flex', gap: '.5rem' }}>
          <Tooltip title="Download schedule">
            <IconButton onClick={handleTakeScreenshot} disabled={viewType === 'gantt'}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Headline name={`${instructor.name}'s Schedule`} />
          {/* toggle show/hide ended intake classes  */}
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', ml: '.5rem' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value={1}
                    sx={{ color: 'primary.main' }}
                    checked={isIncludeEndedIntake}
                    onChange={() => setIsIncludeEndedIntake(!isIncludeEndedIntake)}
                  />
                }
                label="Include ended intake"
              />
            </FormGroup>
          </Box>
        </Box>
        <ViewSwitcher viewType={viewType} handleToggleClick={handleToggleClick} />
      </Box>
      {viewType === 'list' ? (
        <InstructorScheduleTable instructor={instructor} isIncludeEndedIntake={isIncludeEndedIntake} ref={ref} />
      ) : viewType === 'gantt' ? (
        <>
          {filteredGanttItems.length > 0 ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'end', pb: '.5rem' }}>
                <GanttToolTip />
              </Box>
              <Box sx={{ fontSize: '12px' }}>
                <Gantt
                  tasks={filteredGanttItems}
                  viewMode={ViewMode.Week}
                  viewDate={dayjs().subtract(2, 'week').toDate()}
                  columnWidth={40}
                  projectBackgroundColor={theme.palette.gantt.project}
                  projectProgressColor={theme.palette.gantt.project}
                  projectProgressSelectedColor={theme.palette.gantt.project}
                  projectBackgroundSelectedColor={theme.palette.gantt.project}
                  fontSize="12"
                />
              </Box>
            </>
          ) : (
            <Typography sx={{ textAlign: 'center', padding: '10rem' }}>No Schedule</Typography>
          )}
        </>
      ) : null}
    </>
  );
};

export default InstructorSchedule;
