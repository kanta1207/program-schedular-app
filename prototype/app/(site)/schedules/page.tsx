import { convertClassesToGanttItems } from '@/helpers/convertClassesToGanttItems';
import { classes } from '@/mock/_index';
import ScheduleListClient from './Client';

const ScheduleList = () => {
  const ganttItems = convertClassesToGanttItems(classes, true).filter(
    (classItem) => classItem.progress !== 100, // remove past classes
  );
  return <>{ganttItems && <ScheduleListClient ganttItems={ganttItems} />}</>;
};

export default ScheduleList;
