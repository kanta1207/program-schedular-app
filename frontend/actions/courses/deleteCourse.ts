import { ApiResponse } from '@/types/_index';

export const deleteCourse = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`;

    const response = await fetch(baseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
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
