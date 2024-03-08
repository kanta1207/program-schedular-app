import { ApiResponse, UpdateProgramResponse } from '@/types/_index';

interface UpdateProgramPayload {
  name: string;
}

export const updateProgram = async (
  id: number,
  payload: UpdateProgramPayload,
): Promise<ApiResponse<UpdateProgramResponse>> => {
  const { name } = payload;
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/programs/${id}`;

    const payload = { name };

    const response = await fetch(baseUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
