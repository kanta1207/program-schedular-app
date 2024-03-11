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
  const { name, isActive, desiredWorkingHours, contractTypeId, weekdaysRangeId, periodOfDayIds, courseIds, note } =
    payload;

  try {
    if (!name && !contractTypeId) {
      throw new Error('Either name or contract type is required'); // we can add other required sections in here later.
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors`;

    const payload = {
      name: name,
      contractType: contractTypeId,
      desiredWorkingHours: desiredWorkingHours,
      weekdaysRange: weekdaysRangeId,
      periodOfDayIds: periodOfDayIds,
      isActive: isActive,
      courses: courseIds,
      note: note,
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

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
