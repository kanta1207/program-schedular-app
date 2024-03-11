import { instructors, courses } from '@/mock/_index';
import { ApiResponse, UpdateInstructorResponse } from '@/types/_index';

import { CONTRACT_TYPES, PERIOD_OF_DAYS, WEEKDAYS_RANGES } from '@/constants/_index';

interface UpdateInstructorPayload {
  name: string;
  isActive: boolean;
  desiredWorkingHours: number;
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
  const { name, isActive, desiredWorkingHours, contractTypeId, weekdaysRangeId, periodOfDayIds, courseIds, note } =
    payload;

  try {
    if (!name && !contractTypeId) {
      throw new Error('Either name or contract type is required'); // we can add other required sections in here later.
    }
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors/${id}`;

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
