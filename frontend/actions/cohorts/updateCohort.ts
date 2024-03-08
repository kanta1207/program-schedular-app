import { ApiResponse } from '@/types/apiResponse';
import { UpdateCohortResponse } from '@/types/cohort';

interface UpdateCohortPayload {
  name: string;
  intakeId: number;
  periodOfDayId: number;
  programId: number;
}

export const updateCohort = async (
  id: number,
  payload: UpdateCohortPayload,
): Promise<ApiResponse<UpdateCohortResponse>> => {
  const { name, intakeId, periodOfDayId, programId } = payload;
  try {
    if (!name && !intakeId && !periodOfDayId && !programId) {
      throw new Error("Something's wrong in the input data");
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts/${id}`;

    const payload = { name, intakeId, periodOfDayId, programId };

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

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
