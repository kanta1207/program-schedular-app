import { ApiResponse, CreateInstructorResponse } from '@/types/_index';

interface CreateInstructorPayload {
  name: string;
  isActive: boolean;
  desiredWorkingHours: number | null;
  contractTypeId: number;
  weekdaysRangeId: number;
  periodOfDayIds: number[];
  courseIds: number[];
  note: string | null;
}

export const createInstructor = async (
  payload: CreateInstructorPayload,
): Promise<ApiResponse<CreateInstructorResponse>> => {
  const { name, contractTypeId, weekdaysRangeId, periodOfDayIds, courseIds } = payload;

  try {
    if (
      !name ||
      !contractTypeId ||
      !contractTypeId ||
      !weekdaysRangeId ||
      periodOfDayIds.length === 0 ||
      courseIds.length === 0
    ) {
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.messages);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
