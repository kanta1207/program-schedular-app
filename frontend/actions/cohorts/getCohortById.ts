import { cohorts } from '@/mock/_index';
import { ApiResponse, GetCohortResponse } from '@/types/_index';

export const getCohortById = async (id: string): Promise<ApiResponse<GetCohortResponse>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cohorts/${id}`;

    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
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
