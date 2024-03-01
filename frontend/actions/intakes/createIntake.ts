import { Dayjs } from 'dayjs';
import { revalidateTag } from 'next/cache';
import { intakes } from '@/mock/_index';
import { Intake } from '@/types/_index';

interface CreateIntakePayload {
  name: string;
  startAt: Dayjs;
  endAt: Dayjs;
}

export const createIntake = async (payload: CreateIntakePayload): Promise<Intake> => {
  const { name, startAt, endAt } = payload;
  console.log(startAt.toDate(), endAt.toDate());

  return intakes[0];

  // TODO: Fetch data from api
  try {
    if (name === '') {
      throw new Error('Name cannot be empty');
    }
    if (!startAt && !endAt) {
      throw new Error('Either startAt or endAt is required');
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/intakes`;

    const payload = {
      name: name,
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
