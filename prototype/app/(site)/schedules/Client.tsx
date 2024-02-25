"use client";
import dayjs from "dayjs";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useState } from "react";

interface ScheduleListClientProps {
  ganttItems: Task[];
}

const ScheduleListClient: React.FC<ScheduleListClientProps> = ({
  ganttItems,
}) => {
  const [tasks, setTasks] = useState<Task[]>(ganttItems);
  return (
    <div className="w-full">
      {ganttItems && (
        <Gantt
          tasks={ganttItems}
          viewMode={ViewMode.Week}
          viewDate={dayjs().subtract(2, "week").toDate()}
          columnWidth={120}
          fontSize="12"
          onClick={() =>
            alert("We can show drawer or something to update this schedule")
          }
        />
      )}
    </div>
  );
};

export default ScheduleListClient;
