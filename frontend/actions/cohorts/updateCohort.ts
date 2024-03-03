import { PERIOD_OF_DAYS, PROGRAMS } from '@/constants/_index';
import { cohorts, intakes } from '@/mock/_index';
import { Cohort, PeriodOfDayName, ProgramName } from '@/types/_index';
import { revalidateTag } from 'next/cache';

interface UpdateCohortPayload {
  name: string;
  intakeName: string;
  programName: ProgramName;
  periodName: PeriodOfDayName;
}

export const updateCohort = async (id: number, payload: UpdateCohortPayload): Promise<Cohort> => {
  const { name, intakeName, programName, periodName } = payload;
  console.log(id, name, intakeName, programName, periodName);

  const tmpCohort = cohorts.find((CohortItem) => CohortItem.id === id)!;
  tmpCohort.name === name;
  tmpCohort.intake.name === intakeName;
  tmpCohort.program.name === programName;
  tmpCohort.periodOfDay.name === periodName;
  return tmpCohort;

  // TODO: Fetch data from api
  try {
    if (!name && !intakeName && !programName && !periodName) {
      throw new Error("Something's wrong in the input data");
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts/${id}`;

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
      method: 'PATCH',
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
