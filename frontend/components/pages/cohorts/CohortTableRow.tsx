import { Cohort } from '@/types/cohort';
import { TableCell } from '@mui/material';
import Link from 'next/link';

type CohortProps = {
  cohort: Cohort;
};

export const CohortTableRow: React.FC<CohortProps> = ({ cohort }: CohortProps) => {
  return (
    <>
      <TableCell component="th" scope="row">
        <Link href={`/cohorts/${cohort.id}`}>{cohort.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/cohorts/${cohort.id}`}>{cohort.intake.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/cohorts/${cohort.id}`}>{cohort.program.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/cohorts/${cohort.id}`}>{cohort.periodOfDay.name}</Link>
      </TableCell>
    </>
  );
};
