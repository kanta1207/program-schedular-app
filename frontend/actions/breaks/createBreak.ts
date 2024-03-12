import { Dayjs } from 'dayjs';
import { ApiResponse, CreateBreakResponse } from '@/types/_index';

interface CreateBreakPayload {
  startAt: Dayjs;
  endAt: Dayjs;
}

export const createBreak = async (payload: CreateBreakPayload): Promise<ApiResponse<CreateBreakResponse>> => {
  const { startAt, endAt } = payload;
  try {
    if (!startAt && !endAt) {
      throw new Error('Both startAt and endAt are required');
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/breaks`;

    const payload = {
      startAt: startAt,
      endAt: endAt,
    };

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
