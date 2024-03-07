import { Break } from '@/types/_index';
import { ApiResponse } from '@/types/_index';

export const getBreaks = async (): Promise<ApiResponse<Break[]>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/breaks`;

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
