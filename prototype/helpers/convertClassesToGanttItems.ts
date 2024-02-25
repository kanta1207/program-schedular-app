import theme from "@/app/theme";
import { Class } from "@/types/class";
import dayjs from "dayjs";
import { Task } from "gantt-task-react";

export const convertClassesToGanttItems = (classes: Class[]): Task[] => {
  const ganttItems: Task[] = [];

  for (const classItem of classes) {
    const getProgress = (startAt: Date, endAt: Date) => {
      const now = dayjs().toDate();

      // case: class term has already ended
      if (endAt < now) return 100;

      // case: in the middle of the class term
      if (startAt < now && endAt > now) {
        const classDuration =
          classItem.endAt.getTime() - classItem.startAt.getTime();
        const progressedTime = now.getTime() - classItem.startAt.getTime();

        const classDurationDays = Math.ceil(classDuration / (1000 * 3600 * 24));
        const progressedTimeDays = Math.ceil(
          progressedTime / (1000 * 3600 * 24)
        );

        const progress = Math.ceil(
          (progressedTimeDays / classDurationDays) * 100
        );

        return progress;
      }

      // class term has not come yet
      return 0;
    };

    const ganttItem: Task = {
      start: dayjs(classItem.startAt).toDate(),
      end: dayjs(classItem.endAt).toDate(),
      name: `${classItem.course.name} (${classItem.cohort.name} at ${classItem.classroom.name}) | ${classItem.cohort.periodOfDay.time} | ${classItem.weekdaysRange.name}`,
      id: classItem.id.toString(),
      type: "task",
      progress: getProgress(classItem.startAt, classItem.endAt),
      isDisabled: true,
      project: classItem.cohort.intake.name,
      styles: {
        progressColor: theme.palette.primary.main,
        progressSelectedColor: "#ffbb54",
      },
    };

    ganttItems.push(ganttItem);
  }

  return ganttItems;
};
