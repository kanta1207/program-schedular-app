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
    if (name === '') {
      throw new Error('Name cannot be empty');
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/programs/${id}`;

    const payload = { name };

    const response = await fetch(baseUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
