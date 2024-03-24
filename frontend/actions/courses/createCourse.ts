import { ApiResponse, CreateCourseResponse } from '@/types/_index';

interface CreateCoursePayload {
  name: string;
  programId: number;
  requiredHours: number;
}

export const createCourse = async (payload: CreateCoursePayload): Promise<ApiResponse<CreateCourseResponse>> => {
  try {
    if (!payload.name || !payload.programId || payload.requiredHours < 0) {
      throw new Error("Something's wrong in the input data");
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/courses`;

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
