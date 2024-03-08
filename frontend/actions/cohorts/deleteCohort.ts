import { ApiResponse } from '@/types/apiResponse';

export const deleteCohort = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts/${id}`;

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
