import { PERIOD_OF_DAYS } from '@/constants/period-of-days';
import { PROGRAMS } from '@/constants/program';
import { cohorts } from '@/mock/cohort';
import { intakes } from '@/mock/intake';
import { Cohort, PeriodOfDayName, ProgramName } from '@/types/_index';
import { revalidateTag } from 'next/cache';

interface CreateCohortPayload {
  name: string;
  intakeName: string;
  programName: ProgramName;
  periodName: PeriodOfDayName;
}

export const createCohort = async (payload: CreateCohortPayload): Promise<Cohort> => {
  const { name, intakeName, programName, periodName } = payload;
  console.log(name, intakeName, programName, periodName);

  return cohorts[0];

  // TODO: Fetch data from api
  try {
    if (!name && !intakeName && !programName && !periodName) {
      throw new Error("Something's wrong in the input data");
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts`;

    // TODO: Fetch data from intake api
    const intake = intakes.find((intake) => intake.name === intakeName);

    const program = PROGRAMS.find((program) => program.name === programName);
    const period = PERIOD_OF_DAYS.find((period) => period.name === periodName);

    const payload = {
      name: name,
      intake: intake,
      program: program,
      period: period,
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    revalidateTag('Cohort');

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
