'use client';

import { useRef, useState } from 'react';
import ViewSwitcher, { ViewType } from './ViewSwitcher';
import { InstructorScheduleTable } from './InstructorScheduleTable';

import { GetInstructorsResponse } from '@/types/instructor';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from 'dayjs';
import theme from '@/app/theme';
import Headline from '@/components/partials/Headline';
import GanttToolTip from '@/components/partials/gantt/GanttToolTip';

import { useScreenshot } from '@/hooks/useScreenShot';
import { toast } from 'react-toastify';
import { TOAST } from '@/constants/message';

interface InstructorScheduleProps {
  instructor: GetInstructorsResponse;
  ganttItems: Task[];
}

const InstructorSchedule: React.FC<InstructorScheduleProps> = ({ instructor, ganttItems }) => {
  const [viewType, setViewType] = useState<ViewType>('list');
  const ref = useRef(null);

  const { takeScreenShot } = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0,
  });

  const fileName = `${instructor.name.replace(/\s/g, '_')}_${dayjs().format('YYYY-MM-DD')}`;

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newViewType: ViewType) => {
    setViewType(newViewType);
  };

  const handleTakeScreenshot = () => {
    try {
      ref.current && takeScreenShot(ref.current, fileName);
    } catch (error) {
      toast.error(TOAST.error.screenshot);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
        {viewType === 'list' ? (
          <Box sx={{ display: 'flex' }}>
            <Headline name={`${instructor.name}'s Schedule`} />
            <Tooltip title="Download schedule">
              <IconButton onClick={handleTakeScreenshot} sx={{ marginBottom: '0.35em' }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Headline name={`${instructor.name}'s Schedule`} />
        )}
        <ViewSwitcher viewType={viewType} handleToggleClick={handleToggleClick} />
      </Box>
      {viewType === 'list' ? (
        <InstructorScheduleTable instructor={instructor} ref={ref} />
      ) : viewType === 'gantt' ? (
        <>
          {ganttItems.length > 0 ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'end', pb: '.5rem' }}>
                <GanttToolTip />
              </Box>
              <Box sx={{ fontSize: '12px' }}>
                <Gantt
                  tasks={ganttItems}
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
