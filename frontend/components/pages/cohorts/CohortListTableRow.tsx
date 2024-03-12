'use client';
import { PERIOD_OF_DAYS } from '@/constants/_index';
import { GetCohortsResponse } from '@/types/_index';
import { TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';

interface CohortListTableRowProps {
  cohort: GetCohortsResponse;
}

export const CohortListTableRow: React.FC<CohortListTableRowProps> = ({ cohort }) => {
  const router = useRouter();
  const handleRowClick = () => {
    router.push(`/cohorts/${cohort.id}`);
  };
  const icon = PERIOD_OF_DAYS.find(({ id }) => id === cohort.periodOfDay.id)?.icon;

  return (
    <TableRow
      onClick={handleRowClick}
      sx={{
        cursor: 'pointer',
        '&:last-child td, &:last-child th': { border: 0 },
        ':hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
      }}
    >
      <TableCell>{cohort.intake.name}</TableCell>
      <TableCell>{cohort.name}</TableCell>
      <TableCell>{cohort.program.name}</TableCell>
      <TableCell>
        {icon} {cohort.periodOfDay.name}
      </TableCell>
    </TableRow>
  );
};
