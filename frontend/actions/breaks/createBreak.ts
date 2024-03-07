import { Dayjs } from 'dayjs';
import { revalidateTag } from 'next/cache';
import { breaks } from '@/mock/_index';
import { ApiResponse, Break } from '@/types/_index';

interface CreateBreakPayload {
  startAt: Dayjs;
  endAt: Dayjs;
}

export const createBreak = async (payload: CreateBreakPayload): Promise<ApiResponse<Break>> => {
  const { startAt, endAt } = payload;
  console.log(startAt.toDate(), endAt.toDate());

  const data = {
    statusCode: 201,
    message: 'Created',
    data: breaks[0],
  };

  return data;

  // TODO: Fetch data from api
  try {
    if (!startAt && !endAt) {
      throw new Error('Either startAt or endAt is required');
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

    revalidateTag('break');

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
