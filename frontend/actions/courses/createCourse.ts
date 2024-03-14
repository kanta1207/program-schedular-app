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
