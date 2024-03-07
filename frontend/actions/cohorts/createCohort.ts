import { cohorts } from '@/mock/_index';
import { Cohort } from '@/types/_index';
import { revalidateTag } from 'next/cache';

interface CreateCohortPayload {
  name: string;
  intakeId: number;
  periodOfDayId: number;
  programId: number;
}

export const createCohort = async (payload: CreateCohortPayload): Promise<Cohort> => {
  const { name, intakeId, periodOfDayId, programId } = payload;
  console.log(name, intakeId, periodOfDayId, programId);

  return cohorts[0];

  // TODO: Fetch data from api
  try {
    if (!name && !intakeId && !periodOfDayId && !programId) {
      throw new Error("Something's wrong in the input data");
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts`;

    const payload = {
      name: name,
      intakeId: intakeId,
      periodOfDayId: periodOfDayId,
      programId: programId,
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

    revalidateTag('cohort');

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
