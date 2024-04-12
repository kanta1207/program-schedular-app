import { getClasses } from '@/actions/classes/getClasses';
import { convertClassesToGantt } from '@/helpers/convertClassesToGantt';
import { GetClassesGroupByCohort } from '@/types/_index';
import ScheduleList from '../../../components/pages/schedules/ScheduleList';
import { getCohorts } from '@/actions/cohorts/getCohorts';
import { getIntakes } from '@/actions/intakes/getIntakes';
import { getInstructors } from '@/actions/instructors/getInstructors';
import { getCourses } from '@/actions/courses/getCourses';
import { getBreaks } from '@/actions/breaks/getBreaks';
import { getHolidays } from '@/actions/common/getHolidays';
import { getCohortById } from '@/actions/cohorts/getCohortById';

interface Props {
  searchParams: { cohortId: string };
}

const page: React.FC<Props> = async ({ searchParams: { cohortId } }) => {
  const { data } = await getClasses({ groupBy: 'cohort' });
  const cohorts = data as GetClassesGroupByCohort[];
  const gantt = convertClassesToGantt({ cohorts });
  const [
    { data: cohortsList },
    { data: intakes },
    { data: instructors },
    { data: courses },
    { data: breaks },
    holidays,
  ] = await Promise.all([getCohorts(), getIntakes(), getInstructors({}), getCourses(), getBreaks(), getHolidays()]);
  const cohort = cohortId ? (await getCohortById(cohortId)).data : undefined;

  return (
    <ScheduleList
      cohort={cohort}
      initialGantt={gantt}
      instructors={instructors}
      intakes={intakes}
      cohorts={cohortsList}
      courses={courses}
      breaks={breaks}
      holidays={holidays}
    />
  );
};

export default page;
