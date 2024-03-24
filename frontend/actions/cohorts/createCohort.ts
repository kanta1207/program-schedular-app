import { ApiResponse, CreateCohortResponse } from '@/types/_index';

interface CreateCohortPayload {
  name: string;
  intakeId: number;
  periodOfDayId: number;
  programId: number;
}

export const createCohort = async (payload: CreateCohortPayload): Promise<ApiResponse<CreateCohortResponse>> => {
  const { name, intakeId, periodOfDayId, programId } = payload;
  try {
    if (!name || !intakeId || !periodOfDayId || !programId) {
      throw new Error("Something's wrong in the input data");
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts`;

    const payload = { name, intakeId, periodOfDayId, programId };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.messages);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
