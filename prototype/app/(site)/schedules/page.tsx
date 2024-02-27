import { classes } from '@/mock/_index';
import ScheduleListClient from './Client';
import { sortClasses } from '@/helpers/sortClasses';
import { convertClassesToGanttItems } from '@/helpers/convert-classes-to-gantt-items';

const ScheduleList = () => {
  const sortedClasses = sortClasses(classes);
  const ganttItems = convertClassesToGanttItems({ classes: sortedClasses, groupBy: 'cohort' });
  return <ScheduleListClient ganttItems={ganttItems} />;
};

export default ScheduleList;
