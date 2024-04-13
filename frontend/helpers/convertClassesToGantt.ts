import dayjs from 'dayjs';
import { Task } from 'gantt-task-react';
import { PERIOD_OF_DAYS, WEEKDAYS_RANGES } from '@/constants/_index';
import { GetClassResponse, GetClassesGroupByCohort, GetClassesGroupByInstructor } from '@/types/_index';

export type GanttGroupBy = 'cohort' | 'instructor';

export enum RecordType {
  Group = 'project',
  Class = 'task',
}

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

const getClassRecord = (groupName: GanttGroupBy, classData: GetClassResponse): Task => {
  const color = WEEKDAYS_RANGES.find(({ id }) => id === classData.weekdaysRange.id)?.color;
  const periodIcon = PERIOD_OF_DAYS.find(({ id }) => id === classData.cohort.periodOfDay.id)?.icon;
  const startAt = dayjs(classData.startAt).toDate();
  const endAt = dayjs(classData.endAt).toDate();

  const displayName = () => {
    const courseName = classData.course.deletedAt ? `${classData.course.name} (deleted)` : classData.course.name;

    if (groupName === 'cohort') {
      return `${periodIcon} ${courseName} ${classData.instructor ? `| ${classData.instructor.name}` : ''} @${
        classData.classroom.name
      }`;
    } else if (groupName === 'instructor') {
      return `${periodIcon} ${courseName} | ${classData.cohort.name} @${classData.classroom.name}`;
    } else {
      return '';
    }
  };

  const projectName = () => {
    // Put cohort id in common to fetch cohort by id when class item is clicked
    if (groupName === 'cohort') {
      return `${classData.cohort.id}-${classData.cohort.name}`;
    } else if (groupName === 'instructor') {
      return `${classData.cohort.id}-${classData.instructor.name}`;
    } else {
      return '';
    }
  };

  return {
    start: startAt,
    end: endAt,
    name: displayName(),
    id: classData.id.toString(),
    type: RecordType.Class,
    progress: getProgress(startAt, endAt),
    isDisabled: true,
    project: projectName(),
    styles: {
      progressColor: color?.secondary,
      progressSelectedColor: color?.secondary,
      backgroundColor: color?.primary,
      backgroundSelectedColor: color?.primary,
    },
  };
};

const getGanttGroupByCohort = (cohorts: GetClassesGroupByCohort[]) => {
  const ganttItems: Task[] = [];

  for (const cohort of cohorts) {
    const startAt = dayjs(cohort.intake.startAt).toDate();
    const endAt = dayjs(cohort.intake.endAt).toDate();
    const groupRecord: Task = {
      start: startAt,
      end: endAt,
      name: cohort.name,
      id: cohort.name, // associated with 'project' in class record
      project: `${cohort.id}-${cohort.name}`,
      progress: getProgress(startAt, endAt),
      type: RecordType.Group,
      isDisabled: true,
    };
    ganttItems.push(groupRecord);

    for (const classData of cohort.classes) {
      const classRecord = getClassRecord('cohort', classData);
      ganttItems.push(classRecord);
    }
  }

  return ganttItems;
};

const getGanttGroupByInstructor = (instructors: GetClassesGroupByInstructor[]) => {
  const ganttItems: Task[] = [];
  const now = dayjs();

  for (const instructor of instructors) {
    const groupRecord: Task = {
      start: now.subtract(6, 'month').toDate(),
      end: now.add(6, 'month').toDate(),
      name: instructor.name,
      id: instructor.name, // associated with 'project' in class record
      project: `${instructor.id}-${instructor.name}`,
      progress: 100, // progress in instructor doesn't make sense, so put 100 for simplicity.
      type: RecordType.Group,
      isDisabled: true,
    };
    ganttItems.push(groupRecord);

    for (const classData of instructor.classes) {
      const classRecord = getClassRecord('instructor', classData);
      ganttItems.push(classRecord);
    }
  }

  return ganttItems;
};

interface convertClassesToGanttProps {
  cohorts?: GetClassesGroupByCohort[];
  instructors?: GetClassesGroupByInstructor[];
}

export const convertClassesToGantt = ({ cohorts, instructors }: convertClassesToGanttProps): Task[] => {
  if (!cohorts && !instructors) return [];

  if (cohorts && cohorts.length > 0) {
    return getGanttGroupByCohort(cohorts);
  } else if (instructors && instructors.length > 0) {
    return getGanttGroupByInstructor(instructors);
  } else {
    return [];
  }
};
