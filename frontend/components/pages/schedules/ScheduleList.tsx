'use client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import theme from '@/app/theme';
import { Box } from '@mui/material';
import { GanttGroupBy, convertClassesToGantt } from '@/helpers/convertClassesToGantt';
import { getClasses } from '@/actions/classes/getClasses';
import GanttToolTip from '@/components/partials/gantt/GanttToolTip';
import GanttGroupSwitcher from '@/components/partials/gantt/GanttGroupSwitcher';
import { GetClassesGroupByCohort, GetClassesGroupByInstructor } from '@/types/_index';

interface ScheduleListProps {
  initialGantt: Task[];
}

const ScheduleList: React.FC<ScheduleListProps> = ({ initialGantt }) => {
  const [groupBy, setGroupBy] = useState<GanttGroupBy>('cohort');
  const [tasks, setTasks] = useState<Task[]>(initialGantt);

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newGroupBy: GanttGroupBy) => {
    setGroupBy(newGroupBy);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getClasses(groupBy);
      const cohorts = groupBy === 'cohort' ? (data as GetClassesGroupByCohort[]) : undefined;
      const instructors = groupBy === 'instructor' ? (data as GetClassesGroupByInstructor[]) : undefined;
      const ganttItems = convertClassesToGantt({ cohorts, instructors });
      setTasks(ganttItems);
    };
    fetchData();
  }, [groupBy]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '.5rem' }}>
        <GanttGroupSwitcher groupBy={groupBy} handleToggleClick={handleToggleClick} />
        <GanttToolTip />
      </Box>
      {initialGantt && (
        <Box sx={{ fontSize: '12px' }}>
          <Gantt
            ganttHeight={600}
            tasks={tasks}
            viewMode={ViewMode.Week}
            viewDate={dayjs().subtract(2, 'week').toDate()}
            columnWidth={40}
            projectBackgroundColor={theme.palette.gantt.project}
            projectProgressColor={theme.palette.gantt.project}
            projectProgressSelectedColor={theme.palette.gantt.project}
            projectBackgroundSelectedColor={theme.palette.gantt.project}
            fontSize="12"
            // TODO: Handle onClick
            onClick={(task) => alert(`{id: ${task.id}, name: ${task.name}} was clicked`)}
          />
        </Box>
      )}
    </>
  );
};

export default ScheduleList;
