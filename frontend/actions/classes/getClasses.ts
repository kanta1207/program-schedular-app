import { GanttGroupBy } from '@/helpers/convertClassesToGantt';
import { ApiResponse, GetClassesResponse } from '@/types/_index';

export const getClasses = async (groupBy: GanttGroupBy): Promise<ApiResponse<GetClassesResponse[]>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/classes?groupBy=${groupBy}`;

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
