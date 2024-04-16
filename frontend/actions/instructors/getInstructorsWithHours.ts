import { ApiResponse, GetInstructorsWithHoursResponse } from '@/types/_index';
import qs from 'qs';

interface getInstructorsWithHoursProps {
  year?: number;
}

export const getInstructorsWithHours = async ({
  year,
}: getInstructorsWithHoursProps): Promise<ApiResponse<GetInstructorsWithHoursResponse[]>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors/assigned-hours`;
    let url = baseUrl;

    const queryParams = qs.stringify({ year });

    if (queryParams) {
      url += `?${queryParams}`;
    }

    const response = await fetch(url, {
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
