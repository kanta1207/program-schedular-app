import { ApiResponse, CreateProgramResponse } from '@/types/_index';

interface CreateProgramPayload {
  name: string;
}

export const createProgram = async (payload: CreateProgramPayload): Promise<ApiResponse<CreateProgramResponse>> => {
  const { name } = payload;

  try {
    if (name === '') {
      throw new Error('Name cannot be empty');
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/programs`;

    const payload = { name };

    const response = await fetch(baseUrl, {
      method: 'POST',
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
