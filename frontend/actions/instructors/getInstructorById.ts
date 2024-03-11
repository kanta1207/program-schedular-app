import { ApiResponse, GetInstructorResponse } from '@/types/_index';

export const getInstructorById = async (id: string): Promise<ApiResponse<GetInstructorResponse>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors/${id}`;

    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['instructor'] },
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
