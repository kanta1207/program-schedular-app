import { ApiResponse, GetInstructorsResponse } from '@/types/_index';
import qs from 'qs';

interface getInstructorsProps {
  courseId?: number;
  rangeId?: number;
}

export const getInstructors = async ({
  courseId,
  rangeId,
}: getInstructorsProps): Promise<ApiResponse<GetInstructorsResponse[]>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors`;
    let url = baseUrl;

    const queryParams = qs.stringify({ courseId, rangeId });

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
