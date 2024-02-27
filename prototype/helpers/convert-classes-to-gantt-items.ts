import dayjs from 'dayjs';
import { Task } from 'gantt-task-react';
import { cohorts } from '@/mock/_index';
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

export const convertClassesToGanttItems = (classes: Class[], withInstructorName: boolean = false): Task[] => {
  const ganttItems: Task[] = [];

  // Add cohorts
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

  // Add classes
  for (const classItem of classes) {
    const classRecord: Task = {
      start: dayjs(classItem.startAt).toDate(),
      end: dayjs(classItem.endAt).toDate(),
      name: `${
        classItem.cohort.periodOfDay.name === 'Morning'
          ? '🌅'
          : classItem.cohort.periodOfDay.name === 'Afternoon'
          ? '☀️'
          : classItem.cohort.periodOfDay.name === 'Evening'
          ? '🌙'
          : ''
      } ${classItem.course.name} (${classItem.cohort.name} at ${classItem.classroom.name})
      ${withInstructorName ? ` | ${classItem.instructor?.name}` : ''}`,
      id: classItem.id.toString(),
      type: 'task',
      progress: getProgress(classItem.startAt, classItem.endAt),
      isDisabled: true,
      project: classItem.cohort.name, // associated with id in project
      styles: {
        progressColor:
          classItem.weekdaysRange.name === 'Monday - Friday'
            ? '#76568f'
            : classItem.weekdaysRange.name === 'Monday - Wednesday'
            ? '#3866a8'
            : classItem.weekdaysRange.name === 'Wednesday - Friday'
            ? '#ba4359'
            : '',
        progressSelectedColor:
          classItem.weekdaysRange.name === 'Monday - Friday'
            ? '#76568f'
            : classItem.weekdaysRange.name === 'Monday - Wednesday'
            ? '#3866a8'
            : classItem.weekdaysRange.name === 'Wednesday - Friday'
            ? '#ba4359'
            : '',
        backgroundColor:
          classItem.weekdaysRange.name === 'Monday - Friday'
            ? '#662d91'
            : classItem.weekdaysRange.name === 'Monday - Wednesday'
            ? '#0047AB'
            : classItem.weekdaysRange.name === 'Wednesday - Friday'
            ? '#BA0021'
            : '',
        backgroundSelectedColor:
          classItem.weekdaysRange.name === 'Monday - Friday'
            ? '#662d91'
            : classItem.weekdaysRange.name === 'Monday - Wednesday'
            ? '#0047AB'
            : classItem.weekdaysRange.name === 'Wednesday - Friday'
            ? '#BA0021'
            : '',
      },
    };

    const parentIndex = ganttItems.findIndex((item) => item.id === classItem.cohort.name);
    if (parentIndex !== -1) {
      ganttItems.splice(parentIndex + 1, 0, classRecord);
    }
  }

  return ganttItems;
};
