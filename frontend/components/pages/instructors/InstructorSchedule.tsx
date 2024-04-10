'use client';

import { useRef, useState } from 'react';
import ViewSwitcher, { ViewType } from './ViewSwitcher';
import { InstructorScheduleTable } from './InstructorScheduleTable';
import { GetInstructorsResponse } from '@/types/instructor';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import dayjs from 'dayjs';
import theme from '@/app/theme';
import Headline from '@/components/partials/Headline';
import GanttToolTip from '@/components/partials/gantt/GanttToolTip';

import { useScreenshot } from '@/hooks/useTakeScreenShot';
import { toast } from 'react-toastify';

interface InstructorScheduleProps {
  instructor: GetInstructorsResponse;
  ganttItems: Task[];
}

const InstructorSchedule: React.FC<InstructorScheduleProps> = ({ instructor, ganttItems }) => {
  const [viewType, setViewType] = useState<ViewType>('list');
  const ref = useRef(null);

  const { takeScreenShot, downloadScreenshot } = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0,
  });

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newViewType: ViewType) => {
    setViewType(newViewType);
  };

  const handleTakeScreenshot = () => {
    ref.current &&
      takeScreenShot(ref.current)
        .then(() => downloadScreenshot('jpeg', 'schedule'))
        .catch((err) => {
          toast.error('Failed to take screenshot');
          console.error(err);
        });
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Take Screenshot">
          <IconButton onClick={handleTakeScreenshot}>
            <CameraAltIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box ref={ref}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
          <Headline name={`${instructor.name}'s Schedule`} />
          <ViewSwitcher viewType={viewType} handleToggleClick={handleToggleClick} />
        </Box>
        {viewType === 'list' ? (
          <InstructorScheduleTable instructor={instructor} />
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
      </Box>
    </>
  );
};

export default InstructorSchedule;
