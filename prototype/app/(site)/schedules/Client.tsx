'use client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import 'gantt-task-react/dist/index.css';
import { GanttGroupBy, convertClassesToGanttItems } from '@/helpers/convert-classes-to-gantt-items';
import { sortClasses } from '@/helpers/sortClasses';
import { classes } from '@/mock/_index';
import theme from '@/app/theme';
import { fontSize } from '@mui/system';

interface ScheduleListClientProps {
  ganttItems: Task[];
}

export const ScheduleGuide = () => {
  return (
    <div className="flex justify-end p-4 text-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-end gap-x-4">
          <p>🌅 Morning</p>
          <p>☀️ Afternoon</p>
          <p>🌙 Evening</p>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-sm bg-[#662d91]" />
            Monday - Friday
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-sm bg-[#0047AB]" />
            Monday - Wednesday
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-sm bg-[#BA0021]" />
            Wednesday - Friday
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleListClient: React.FC<ScheduleListClientProps> = ({ ganttItems }) => {
  const [groupBy, setGroupBy] = useState<GanttGroupBy>('cohort');
  const [tasks, setTasks] = useState<Task[]>(ganttItems);

  const handleGroupByChange = (event: React.MouseEvent<HTMLElement>, newGroupBy: GanttGroupBy) => {
    setGroupBy(newGroupBy);
  };

  useEffect(() => {
    const sortedClasses = sortClasses(classes);
    const ganttItems = convertClassesToGanttItems({ classes: sortedClasses, groupBy: groupBy });
    setTasks(ganttItems);
  }, [groupBy]);

  return (
    <div className="w-full">
      <ToggleButtonGroup color="primary" value={groupBy} exclusive onChange={handleGroupByChange} aria-label="Group by">
        <ToggleButton value="cohort" disabled={groupBy === 'cohort'}>
          <ClassIcon />
          Cohort
        </ToggleButton>
        <ToggleButton value="instructor" disabled={groupBy === 'instructor'}>
          <PersonIcon />
          Instructor
        </ToggleButton>
      </ToggleButtonGroup>
      <ScheduleGuide />
      {ganttItems && (
        <div className="text-xs">
          <Gantt
            tasks={tasks}
            viewMode={ViewMode.Week}
            viewDate={dayjs().subtract(2, 'week').toDate()}
            columnWidth={50}
            projectBackgroundColor={theme.palette.primary.main}
            projectProgressColor={theme.palette.primary.main}
            projectProgressSelectedColor={theme.palette.primary.light}
            projectBackgroundSelectedColor={theme.palette.primary.light}
            fontSize="12"
            onClick={() => alert('We can show drawer or something to update this schedule')}
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleListClient;
