import dayjs from 'dayjs';
import { Task } from 'gantt-task-react';
import { cohorts, instructors } from '@/mock/_index';
import { Class } from '@/types/_index';

const getProgress = (startAt: Date, endAt: Date) => {
  const now = dayjs().toDate();

  // case: class term has already ended
  if (endAt < now) return 100;

  // case: in the middle of the class term
  if (startAt < now && endAt > now) {
    const classDuration = endAt.getTime() - startAt.getTime();
    const progressedTime = now.getTime() - startAt.getTime();

    const classDurationDays = Math.ceil(classDuration / (1000 * 3600 * 24));
    const progressedTimeDays = Math.ceil(progressedTime / (1000 * 3600 * 24));

    const progress = Math.ceil((progressedTimeDays / classDurationDays) * 100);

    return progress;
  }

  // class term has not come yet
  return 0;
};

export type GanttGroupBy = 'cohort' | 'instructor';
interface convertClassesToGanttItemsProps {
  classes: Class[];
  groupBy: GanttGroupBy;
}

export const convertClassesToGanttItems = ({ classes, groupBy }: convertClassesToGanttItemsProps): Task[] => {
  const ganttItems: Task[] = [];

  if (groupBy === 'cohort') {
    for (const cohort of cohorts) {
      const group: Task = {
        start: dayjs(cohort.intake.startAt).toDate(),
        end: dayjs(cohort.intake.endAt).toDate(),
        name: cohort.name,
        id: cohort.name, // associated with 'project' in classItem
        progress: getProgress(cohort.intake.startAt, cohort.intake.endAt),
        type: 'project',
        project: cohort.name,
        isDisabled: true,
        hideChildren: false,
      };
      ganttItems.push(group);
    }
  } else if (groupBy === 'instructor') {
    for (const instructor of instructors) {
      const group: Task = {
        start: dayjs().subtract(6, 'month').toDate(),
        end: dayjs().add(6, 'month').toDate(),
        name: instructor.name,
        id: instructor.name, // associated with 'project' in classItem
        progress: getProgress(dayjs().toDate(), dayjs().toDate()),
        type: 'project',
        project: instructor.name,
        isDisabled: true,
        hideChildren: false,
      };
      ganttItems.push(group);
    }
  }

  // Add classes
  for (const classItem of classes) {
    const parentName =
      groupBy === 'cohort' ? classItem.cohort.name : groupBy === 'instructor' ? classItem.instructor?.name : '';

    const classRecord: Task = {
      start: dayjs(classItem.startAt).toDate(),
      end: dayjs(classItem.endAt).toDate(),
      // name: `${
      //   classItem.cohort.periodOfDay.name === 'Morning'
      //     ? '🌅'
      //     : classItem.cohort.periodOfDay.name === 'Afternoon'
      //     ? '☀️'
      //     : classItem.cohort.periodOfDay.name === 'Evening'
      //     ? '🌙'
      //     : ''
      // } ${classItem.course.name} (${classItem.cohort.name} at ${classItem.classroom.name})
      // ${groupBy === 'cohort' ? ` | ${classItem.instructor?.name}` : ''}`,
      name: `${
        classItem.cohort.periodOfDay.name === 'Morning'
          ? '🌅'
          : classItem.cohort.periodOfDay.name === 'Afternoon'
          ? '☀️'
          : classItem.cohort.periodOfDay.name === 'Evening'
          ? '🌙'
          : ''
      } ${classItem.course.name} ${groupBy === 'cohort' ? ` | ${classItem.instructor?.name}` : ''}`,
      id: classItem.id.toString(),
      type: 'task',
      progress: getProgress(classItem.startAt, classItem.endAt),
      isDisabled: true,
      project: parentName,
      styles: {
        progressColor:
          classItem.weekdaysRange.name === 'Mon - Fri'
            ? '#72519E'
            : classItem.weekdaysRange.name === 'Mon - Wed'
            ? '#365390'
            : classItem.weekdaysRange.name === 'Wed - Fri'
            ? '#BF3F4F'
            : '',
        progressSelectedColor:
          classItem.weekdaysRange.name === 'Mon - Fri'
            ? '#72519E'
            : classItem.weekdaysRange.name === 'Mon - Wed'
            ? '#365390'
            : classItem.weekdaysRange.name === 'Wed - Fri'
            ? '#BF3F4F'
            : '',
        backgroundColor:
          classItem.weekdaysRange.name === 'Mon - Fri'
            ? '#512888'
            : classItem.weekdaysRange.name === 'Mon - Wed'
            ? '#062A77'
            : classItem.weekdaysRange.name === 'Wed - Fri'
            ? '#B11225'
            : '',
        backgroundSelectedColor:
          classItem.weekdaysRange.name === 'Mon - Fri'
            ? '#512888'
            : classItem.weekdaysRange.name === 'Mon - Wed'
            ? '#062A77'
            : classItem.weekdaysRange.name === 'Wed - Fri'
            ? '#B11225'
            : '',
      },
    };

    const parentIndex = ganttItems.findIndex((item) => item.id === parentName);
    if (parentIndex !== -1) {
      ganttItems.splice(parentIndex + 1, 0, classRecord);
    }
  }

  return ganttItems;
};
