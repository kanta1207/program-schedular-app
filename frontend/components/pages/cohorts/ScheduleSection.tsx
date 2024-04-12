'use client';
import {
  GetBreaksResponse,
  GetCohortResponse,
  GetCohortsResponse,
  GetCoursesResponse,
  GetInstructorsResponse,
  Holiday,
} from '@/types/_index';
import CohortSchedule from '../../partials/cohortSchedule/CohortSchedule';
import { useState } from 'react';

interface ScheduleSectionProps {
  cohort: GetCohortResponse;
  courses: GetCoursesResponse[];
  instructors: GetInstructorsResponse[];
  cohorts: GetCohortsResponse[];
  breaks: GetBreaksResponse[];
  holidays: Holiday[] | undefined;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  cohort,
  courses,
  instructors,
  cohorts,
  breaks,
  holidays,
}) => {
  const [isScheduleEditable, setIsScheduleEditable] = useState(false);
  return (
    <CohortSchedule
      cohort={cohort}
      courses={courses}
      instructors={instructors}
      cohorts={cohorts}
      breaks={breaks}
      holidays={holidays}
      isScheduleEditable={isScheduleEditable}
      setIsScheduleEditable={setIsScheduleEditable}
    />
  );
};

export default ScheduleSection;
