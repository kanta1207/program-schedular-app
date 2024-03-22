'use client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import theme from '@/app/theme';
import { Box, Button, Typography } from '@mui/material';
import { GanttGroupBy, convertClassesToGantt } from '@/helpers/convertClassesToGantt';
import { getClasses, getClassesProps } from '@/actions/classes/getClasses';
import GanttToolTip from '@/components/partials/gantt/GanttToolTip';
import GanttGroupSwitcher from '@/components/partials/gantt/GanttGroupSwitcher';
import {
  GetClassesGroupByCohort,
  GetClassesGroupByInstructor,
  GetCohortsResponse,
  GetInstructorsResponse,
  GetIntakesResponse,
} from '@/types/_index';
import FilterScheduleDialog, { ScheduleFilters, filterKey } from './FilterDialog';
import { FilterAlt } from '@mui/icons-material';

interface ScheduleListProps {
  initialGantt: Task[];
  instructors: GetInstructorsResponse[];
  intakes: GetIntakesResponse[];
  cohorts: GetCohortsResponse[];
}

const ScheduleList: React.FC<ScheduleListProps> = ({ initialGantt, instructors, intakes, cohorts }) => {
  const [groupBy, setGroupBy] = useState<GanttGroupBy>('cohort');
  const [ganttItems, setGanttItems] = useState<Task[]>(initialGantt);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filterSettings, setFilterSettings] = useState<ScheduleFilters>();

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newGroupBy: GanttGroupBy) => {
    setGroupBy(newGroupBy);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedFilterSettings = localStorage.getItem(filterKey);
      let params: getClassesProps = { groupBy };
      if (storedFilterSettings) {
        const { cohortIds, instructorIds }: ScheduleFilters = JSON.parse(storedFilterSettings);
        params = {
          ...params,
          cohortId: cohortIds,
          instructorId: instructorIds,
        };
      }

      const { data } = await getClasses(params);

      const cohorts = groupBy === 'cohort' ? (data as GetClassesGroupByCohort[]) : undefined;
      const instructors = groupBy === 'instructor' ? (data as GetClassesGroupByInstructor[]) : undefined;
      const ganttItems = convertClassesToGantt({ cohorts, instructors });

      setGanttItems(ganttItems);
    };
    fetchData();
  }, [groupBy, filterSettings]);

  const handleFilterOpen = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterClose = (scheduleFilters?: ScheduleFilters) => {
    scheduleFilters && setFilterSettings(scheduleFilters);
    setFilterDialogOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '.5rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <GanttGroupSwitcher groupBy={groupBy} handleToggleClick={handleToggleClick} />
          <Button startIcon={<FilterAlt />} onClick={handleFilterOpen} sx={{ '& .MuiButton-startIcon': { mr: '0px' } }}>
            Filter
          </Button>
          <FilterScheduleDialog
            dialogOpen={filterDialogOpen}
            onClose={handleFilterClose}
            instructors={instructors}
            intakes={intakes}
            cohorts={cohorts}
          />
        </Box>
        <GanttToolTip />
      </Box>
      {ganttItems.length > 0 ? (
        <Box sx={{ fontSize: '12px' }}>
          <Gantt
            ganttHeight={600}
            tasks={ganttItems}
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
      ) : (
        <Typography sx={{ textAlign: 'center', padding: '10rem' }}>No results found.</Typography>
      )}
    </>
  );
};

export default ScheduleList;
