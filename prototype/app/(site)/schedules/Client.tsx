'use client';
import dayjs from 'dayjs';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

interface ScheduleListClientProps {
  ganttItems: Task[];
}

export const ScheduleGuide = () => {
  return (
    <div className="flex justify-end p-4 text-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-end gap-x-4">
          <p>🌅 Morning</p>
          <p>☀️ Afternoon</p>
          <p>🌙 Evening</p>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-sm bg-[#662d91]" />
            Monday - Friday
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-sm bg-[#0047AB]" />
            Monday - Wednesday
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-sm bg-[#BA0021]" />
            Wednesday - Friday
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleListClient: React.FC<ScheduleListClientProps> = ({ ganttItems }) => {
  return (
    <div className="w-full">
      <ScheduleGuide />
      {ganttItems && (
        <div className="text-xs">
          <Gantt
            tasks={ganttItems}
            viewMode={ViewMode.Week}
            viewDate={dayjs().subtract(2, 'week').toDate()}
            columnWidth={50}
            fontSize="12"
            onClick={() => alert('We can show drawer or something to update this schedule')}
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleListClient;
