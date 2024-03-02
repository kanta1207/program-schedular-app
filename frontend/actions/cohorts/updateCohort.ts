import { cohorts } from '@/mock/cohort';
import { Cohort, PeriodOfDayName, ProgramName } from '@/types/_index';
import { revalidateTag } from 'next/cache';

interface UpdateCohortPayload {
  name: string;
  intake: string;
  program: ProgramName;
  period: PeriodOfDayName;
}

export const updateCohort = async (id: number, payload: UpdateCohortPayload): Promise<Cohort> => {
  const { name, intake, program, period } = payload;
  console.log(id, name, intake, program, period);

  const tmpCohort = cohorts.find((CohortItem) => CohortItem.id === id)!;
  tmpCohort.name === name;
  tmpCohort.intake.name === intake;
  tmpCohort.program.name === program;
  tmpCohort.periodOfDay.name === period;
  return tmpCohort;

  // TODO: Fetch data from api
  try {
    // if (!startAt && !endAt) {
    //   throw new Error('Either startAt or endAt is required');
    // }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts/${id}`;

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
