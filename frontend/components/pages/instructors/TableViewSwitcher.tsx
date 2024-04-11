import { CalendarMonth, Person } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export type TableViewType = 'info' | 'hours';

interface ViewSwitcherProps {
  tableViewType: TableViewType;
  handleToggleClick: (event: React.MouseEvent<HTMLElement>, newViewType: TableViewType) => void;
}

const TableViewSwitcher: React.FC<ViewSwitcherProps> = ({ tableViewType, handleToggleClick }) => {
  return (
    <ToggleButtonGroup color="primary" value={tableViewType} exclusive onChange={handleToggleClick}>
      <ToggleButton value="info" disabled={tableViewType === 'info'} sx={{ minWidth: '90px' }}>
        <Person sx={{ mr: '0.25rem' }} />
        Info
      </ToggleButton>
      <ToggleButton value="hours" disabled={tableViewType === 'hours'} sx={{ minWidth: '90px' }}>
        <CalendarMonth sx={{ mr: '0.25rem' }} />
        Hours
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TableViewSwitcher;
