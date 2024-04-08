import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';

export type ViewType = 'list' | 'gantt';

interface ViewSwitcherProps {
  viewType: ViewType;
  handleToggleClick: (event: React.MouseEvent<HTMLElement>, newViewType: ViewType) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewType, handleToggleClick }) => {
  return (
    <ToggleButtonGroup color="primary" value={viewType} exclusive onChange={handleToggleClick}>
      <ToggleButton value="list" disabled={viewType === 'list'}>
        <ListIcon />
        List
      </ToggleButton>
      <ToggleButton value="gantt" disabled={viewType === 'gantt'}>
        <WaterfallChartIcon sx={{ transform: 'rotate(270deg)' }} />
        Gantt
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewSwitcher;
