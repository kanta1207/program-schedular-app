import { ApiResponse, UpdateCohortResponse } from '@/types/_index';
import { Dayjs } from 'dayjs';

interface UpdateCohortClassesPayload {
  startAt: Dayjs;
  endAt: Dayjs;
  cohortId: number;
  weekdaysRangeId: number;
  courseId: number;
  classroomId: number;
  instructorId?: number;
}

export const updateCohortClasses = async (
  id: number,
  payload: UpdateCohortClassesPayload[],
): Promise<ApiResponse<UpdateCohortResponse[]>> => {
  try {
    payload.forEach((value) => {
      const { startAt, endAt, cohortId, weekdaysRangeId, courseId, classroomId } = value;
      if (!startAt || !endAt || !cohortId || !weekdaysRangeId || !courseId || !classroomId) {
        throw new Error("Something's wrong in the input data");
      }

      if (startAt > endAt) {
        throw new Error('endAt must be after startAt');
      }
    });

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts/${id}/classes`;

    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ classes: payload }),
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
