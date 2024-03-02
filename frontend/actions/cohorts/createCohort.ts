import { cohorts } from '@/mock/cohort';
import { Cohort, PeriodOfDayName, ProgramName } from '@/types/_index';
import { revalidateTag } from 'next/cache';

interface CreateCohortPayload {
  name: string;
  intake: string;
  program: ProgramName;
  period: PeriodOfDayName;
}

export const createCohort = async (payload: CreateCohortPayload): Promise<Cohort> => {
  const { name, intake, program, period } = payload;
  console.log(name, intake, program, period);

  return cohorts[0];

  // TODO: Fetch data from api
  try {
    // if (!startAt && !endAt) {
    //   throw new Error('Either startAt or endAt is required');
    // }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts`;

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
