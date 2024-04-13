'use client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import theme from '@/app/theme';
import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import { GanttGroupBy, RecordType, convertClassesToGantt } from '@/helpers/convertClassesToGantt';
import { getClasses, getClassesProps } from '@/actions/classes/getClasses';
import GanttToolTip from '@/components/partials/gantt/GanttToolTip';
import GanttGroupSwitcher from '@/components/partials/gantt/GanttGroupSwitcher';
import {
  GetBreaksResponse,
  GetClassesGroupByCohort,
  GetClassesGroupByInstructor,
  GetCohortResponse,
  GetCohortsResponse,
  GetCoursesResponse,
  GetInstructorsResponse,
  GetIntakesResponse,
  Holiday,
} from '@/types/_index';
import FilterScheduleDialog, { ScheduleFilters, filterKey } from './FilterDialog';
import { Close, FilterAlt } from '@mui/icons-material';
import CohortSchedule from '../../partials/cohortSchedule/CohortSchedule';
import { toast } from 'react-toastify';
import { CONFIRM, TOAST } from '@/constants/_index';
import { useRouter } from 'next/navigation';

interface ScheduleListProps {
  cohort?: GetCohortResponse;
  initialGantt: Task[];
  instructors: GetInstructorsResponse[];
  intakes: GetIntakesResponse[];
  cohorts: GetCohortsResponse[];
  courses: GetCoursesResponse[];
  breaks: GetBreaksResponse[];
  holidays: Holiday[] | undefined;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  cohort,
  initialGantt,
  instructors,
  intakes,
  cohorts,
  courses,
  breaks,
  holidays,
}) => {
  const [groupBy, setGroupBy] = useState<GanttGroupBy>('cohort');
  const [ganttItems, setGanttItems] = useState<Task[]>(initialGantt);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filterSettings, setFilterSettings] = useState<ScheduleFilters>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScheduleEditable, setIsScheduleEditable] = useState(false);
  // This flag is used like a switch to notify child component to reset the form, thus boolean value itself doesn't represent its state
  const [resetFlag, setResetFlag] = useState(false);
  const router = useRouter();

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newGroupBy: GanttGroupBy) => {
    setGroupBy(newGroupBy);
  };

  useEffect(() => {
    if (cohort) {
      setIsDrawerOpen(true);
    }
  }, [cohort]);

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
      const activeInstructors = instructors?.filter(({ isActive }) => isActive);
      const ganttItems = convertClassesToGantt({ cohorts, instructors: activeInstructors });

      setGanttItems(ganttItems);
    };
    fetchData();
  }, [groupBy, filterSettings, isScheduleEditable]);

  const handleFilterOpen = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterClose = (scheduleFilters?: ScheduleFilters) => {
    scheduleFilters && setFilterSettings(scheduleFilters);
    setFilterDialogOpen(false);
  };

  const initEditor = () => {
    setResetFlag(!resetFlag); // Reset editing schedule
    setIsScheduleEditable(false);
  };

  const handleGanttItemClick = async (task: Task) => {
    if (task.project) {
      if (task.type === RecordType.Group && groupBy === 'instructor') {
        toast.info(TOAST.info.ganttInstructorClicked);
        return;
      }
      if (isScheduleEditable) {
        if (confirm(CONFIRM.closeEditor)) {
          initEditor();
        } else {
          return;
        }
      }

      const id = task.project.split('-')[0];
      router.push(`/schedules?cohortId=${id}`);
    }
  };

  const handleDrawerCloseClick = () => {
    if (isScheduleEditable) {
      if (confirm(CONFIRM.closeEditor)) {
        initEditor();
      } else {
        return;
      }
    }
    setIsDrawerOpen(false);
  };

  const activeInstructors = instructors.filter(({ isActive }) => isActive);

  const drawerHeight = 400;

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
            instructors={activeInstructors}
            intakes={intakes}
            cohorts={cohorts}
          />
        </Box>
        <GanttToolTip />
      </Box>
      {ganttItems.length > 0 ? (
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
            onClick={handleGanttItemClick}
          />
        </Box>
      ) : (
        <Typography sx={{ textAlign: 'center', padding: '10rem' }}>No results found.</Typography>
      )}
      {cohort && (
        <Drawer
          sx={{
            height: drawerHeight,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              height: drawerHeight,
              boxSizing: 'border-box',
            },
          }}
          open={isDrawerOpen}
          variant="persistent"
          anchor="bottom"
        >
          <IconButton onClick={handleDrawerCloseClick} sx={{ position: 'absolute', top: '8px', right: '8px' }}>
            <Close />
          </IconButton>
          <div className="mx-16 my-4 h-[calc(100%_-_2rem)] overflow-y-scroll custom-scroll-bar">
            <Box sx={{ px: '0.25rem' }}>
              <CohortSchedule
                cohort={cohort}
                cohorts={cohorts}
                instructors={instructors}
                courses={courses}
                breaks={breaks}
                holidays={holidays}
                isScheduleEditable={isScheduleEditable}
                setIsScheduleEditable={setIsScheduleEditable}
                resetFlag={resetFlag}
              />
            </Box>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default ScheduleList;
