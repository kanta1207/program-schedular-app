import { Dayjs } from 'dayjs';
import { revalidateTag } from 'next/cache';
import { breaks } from '@/mock/_index';
import { Break } from '@/types/_index';

interface UpdateBreakPayload {
  startAt: Dayjs;
  endAt: Dayjs;
}

export const updateBreak = async (id: number, payload: UpdateBreakPayload): Promise<Break> => {
  const { startAt, endAt } = payload;
  console.log(id, startAt, endAt);

  const tmpBreak = breaks.find((breakItem) => breakItem.id === id)!;
  tmpBreak.startAt === startAt.toDate();
  tmpBreak.endAt === endAt.toDate();
  return tmpBreak;

  // TODO: Fetch data from api
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
