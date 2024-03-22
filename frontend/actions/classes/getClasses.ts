import { GanttGroupBy } from '@/helpers/convertClassesToGantt';
import { ApiResponse, GetClassesResponse } from '@/types/_index';
import qs from 'qs';

export interface getClassesProps {
  groupBy: GanttGroupBy;
  cohortId?: number[];
  instructorId?: number[];
}

export const getClasses = async ({
  groupBy,
  cohortId,
  instructorId,
}: getClassesProps): Promise<ApiResponse<GetClassesResponse[]>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/classes`;
    let url = baseUrl;

    const queryParams = qs.stringify({ groupBy, cohortId, instructorId });

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
