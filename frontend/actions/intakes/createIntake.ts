import { Dayjs } from 'dayjs';
import { ApiResponse, CreateIntakeResponse } from '@/types/_index';

interface CreateIntakePayload {
  name: string;
  startAt: Dayjs;
  endAt: Dayjs;
}

export const createIntake = async (payload: CreateIntakePayload): Promise<ApiResponse<CreateIntakeResponse>> => {
  const { name, startAt, endAt } = payload;
  try {
    if (name === '') {
      throw new Error('Name cannot be empty');
    }
    if (!startAt && !endAt) {
      throw new Error('Either startAt or endAt is required');
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/intakes`;

    const payload = { name, startAt, endAt };

    const response = await fetch(baseUrl, {
      method: 'POST',
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
