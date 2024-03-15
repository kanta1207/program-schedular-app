import { ApiResponse, UpdateCourseResponse } from '@/types/_index';

interface UpdateCoursePayload {
  name: string;
  programId: number;
  requiredHours: number;
}

export const updateCourse = async (
  id: number,
  payload: UpdateCoursePayload,
): Promise<ApiResponse<UpdateCourseResponse>> => {
  try {
    if (!payload.name && !payload.programId && payload.requiredHours < 0) {
      throw new Error("Something's wrong in the input data");
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`;

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
