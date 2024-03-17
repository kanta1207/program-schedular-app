import { getClasses } from '@/actions/classes/getClasses';
import { convertClassesToGantt } from '@/helpers/convertClassesToGantt';
import { GetClassesGroupByCohort } from '@/types/class';
import ScheduleList from '../../../components/pages/schedules/ScheduleList';
import './style.css';

const page = async () => {
  const { data } = await getClasses('cohort');
  const cohorts = data as GetClassesGroupByCohort[];
  const gantt = convertClassesToGantt({ cohorts });
  return <ScheduleList initialGantt={gantt} />;
};

export default page;
