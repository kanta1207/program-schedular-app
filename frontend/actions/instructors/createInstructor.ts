import { ApiResponse, CreateInstructorResponse } from '@/types/_index';

interface CreateInstructorPayload {
  name: string;
  isActive: boolean;
  desiredWorkingHours: number;
  contractTypeId: number;
  weekdaysRangeId: number;
  periodOfDayIds: number[];
  courseIds: number[];
  note: string | null;
}

export const createInstructor = async (
  payload: CreateInstructorPayload,
): Promise<ApiResponse<CreateInstructorResponse>> => {
  const { name, contractTypeId, weekdaysRangeId } = payload;

  try {
    if (!name || !contractTypeId || !contractTypeId || !weekdaysRangeId) {
      throw new Error("Something's wrong in the input data");
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors`;

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

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
