import { ApiResponse } from '@/types/_index';

export const deleteIntake = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/intakes/${id}`;

    const response = await fetch(baseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.messages);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
