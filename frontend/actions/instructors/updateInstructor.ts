import { ApiResponse, UpdateInstructorResponse } from '@/types/_index';

interface UpdateInstructorPayload {
  name: string;
  isActive: boolean;
  desiredWorkingHours: number | null;
  contractTypeId: number;
  weekdaysRangeId: number;
  periodOfDayIds: number[];
  courseIds: number[];
  note: string | null;
}

export const updateInstructor = async (
  id: number,
  payload: UpdateInstructorPayload,
): Promise<ApiResponse<UpdateInstructorResponse>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors/${id}`;

    const response = await fetch(baseUrl, {
      method: 'PATCH',
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
