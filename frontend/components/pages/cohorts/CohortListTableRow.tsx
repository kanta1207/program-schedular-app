'use client';
import { PERIOD_OF_DAYS } from '@/constants/_index';
import { clickableTrStyle } from '@/styles/_index';
import { GetCohortsResponse } from '@/types/_index';
import { TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next-nprogress-bar';

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
    <TableRow hover onClick={handleRowClick} sx={clickableTrStyle}>
      <TableCell component="th">{cohort.intake.name}</TableCell>
      <TableCell>{cohort.name}</TableCell>
      <TableCell>{cohort.program.name}</TableCell>
      <TableCell>
        {icon} {cohort.periodOfDay.name}
      </TableCell>
    </TableRow>
  );
};
