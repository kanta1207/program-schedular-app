import { PERIOD_OF_DAYS, PROGRAMS } from '@/constants/_index';
import { cohorts, intakes } from '@/mock/_index';
import { Cohort } from '@/types/_index';
import { revalidateTag } from 'next/cache';

interface UpdateCohortPayload {
  name: string;
  intakeId: number;
  periodOfDayId: number;
  programId: number;
}

export const updateCohort = async (id: number, payload: UpdateCohortPayload): Promise<Cohort> => {
  const { name, intakeId, periodOfDayId, programId } = payload;
  console.log(id, name, intakeId, periodOfDayId, programId);

  const tmpCohort = cohorts.find((CohortItem) => CohortItem.id === id)!;
  const intake = intakes.find((intake) => intake.id === intakeId);
  const program = PROGRAMS.find((program) => program.id === programId);
  const periodOfDay = PERIOD_OF_DAYS.find((period) => period.id === periodOfDayId);

  if (intake && program && periodOfDay) {
    tmpCohort.name = name;
    tmpCohort.intake = intake;
    tmpCohort.program = program;
    tmpCohort.periodOfDay = periodOfDay;
    return tmpCohort;
  }

  // TODO: Fetch data from api
  try {
    if (!name && !intakeId && !periodOfDayId && !programId) {
      throw new Error("Something's wrong in the input data");
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts/${id}`;

    const payload = {
      name: name,
      intakeId: intakeId,
      periodOfDayId: periodOfDayId,
      programId: programId,
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

    revalidateTag('cohort');

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
