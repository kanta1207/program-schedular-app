import { getClasses } from '@/actions/classes/getClasses';
import { convertClassesToGantt } from '@/helpers/convertClassesToGantt';
import { GetClassesGroupByCohort } from '@/types/class';
import ScheduleList from '../../../components/pages/schedules/ScheduleList';
import './style.css';
import { getCohorts } from '@/actions/cohorts/getCohorts';
import { getIntakes } from '@/actions/intakes/getIntakes';
import { getInstructors } from '@/actions/instructors/getInstructors';

const page = async () => {
  const { data } = await getClasses({ groupBy: 'cohort' });
  const cohorts = data as GetClassesGroupByCohort[];
  const gantt = convertClassesToGantt({ cohorts });
  const [{ data: cohortsList }, { data: intakes }, { data: instructors }] = await Promise.all([
    getCohorts(),
    getIntakes(),
    getInstructors({ isActive: true }),
  ]);

  return <ScheduleList initialGantt={gantt} instructors={instructors} intakes={intakes} cohorts={cohortsList} />;
};

export default page;
