import { Dayjs } from 'dayjs';
import { ApiResponse, CreateIntakeResponse } from '@/types/_index';

interface CreateIntakePayload {
  name: string;
  startAt: Dayjs;
  endAt: Dayjs;
}

export const createIntake = async (payload: CreateIntakePayload): Promise<ApiResponse<CreateIntakeResponse>> => {
  try {
    const { name, startAt, endAt } = payload;
    if (name === '') {
      throw new Error('Name cannot be empty');
    }
    if (!startAt || !endAt) {
      throw new Error('Both startAt or endAt are required');
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/intakes`;

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
