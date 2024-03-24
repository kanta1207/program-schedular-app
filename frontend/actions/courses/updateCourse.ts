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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.messages);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
