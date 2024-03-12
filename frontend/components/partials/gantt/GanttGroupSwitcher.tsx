import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import { GanttGroupBy } from '@/helpers/convertClassesToGantt';

interface GanttGroupSwitcherProps {
  groupBy: GanttGroupBy;
  handleToggleClick: (event: React.MouseEvent<HTMLElement>, newGroupBy: GanttGroupBy) => void;
}

const GanttGroupSwitcher: React.FC<GanttGroupSwitcherProps> = ({ groupBy, handleToggleClick }) => {
  return (
    <ToggleButtonGroup color="primary" value={groupBy} exclusive onChange={handleToggleClick}>
      <ToggleButton value="cohort" disabled={groupBy === 'cohort'}>
        <ClassIcon />
        Cohort
      </ToggleButton>
      <ToggleButton value="instructor" disabled={groupBy === 'instructor'}>
        <PersonIcon />
        Instructor
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default GanttGroupSwitcher;
