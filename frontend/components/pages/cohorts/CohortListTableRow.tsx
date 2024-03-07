'use client';
import { Cohort } from '@/types/_index';
import { TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';

interface CohortProps {
  cohort: Cohort;
}

export const CohortListTableRow: React.FC<CohortProps> = ({ cohort }) => {
  const router = useRouter();
  const handleRowClick = () => {
    router.push(`/cohorts/${cohort.id}`);
  };

  return (
    <TableRow
      onClick={handleRowClick}
      sx={{
        cursor: 'pointer',
        '&:last-child td, &:last-child th': { border: 0 },
        ':hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
      }}
    >
      <TableCell>{cohort.name}</TableCell>
      <TableCell>{cohort.intake.name}</TableCell>
      <TableCell>{cohort.program.name}</TableCell>
      <TableCell>{cohort.periodOfDay.name}</TableCell>
    </TableRow>
  );
};
