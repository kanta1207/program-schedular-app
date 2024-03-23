import { Dayjs } from 'dayjs';
import { ApiResponse, UpdateBreakResponse } from '@/types/_index';

interface UpdateBreakPayload {
  startAt: Dayjs;
  endAt: Dayjs;
}

export const updateBreak = async (
  id: number,
  payload: UpdateBreakPayload,
): Promise<ApiResponse<UpdateBreakResponse>> => {
  const { startAt, endAt } = payload;
  try {
    if (!startAt && !endAt) {
      throw new Error('Either startAt or endAt is required');
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/breaks/${id}`;

    const payload = {
      startAt: startAt,
      endAt: endAt,
    };

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
